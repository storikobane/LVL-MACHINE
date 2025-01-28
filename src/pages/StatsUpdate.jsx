import React, { useState, useEffect } from 'react';
import "../styles/statsupdate.css";
import { supabase } from '../supabaseClient';

const StatsUpdate = () => {
    const [tableData, setTableData] = useState([]);
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
 const fetchMatchup = async () => {
    setMessage("Loading the latest matchup...");
    try {
        // Fetch the latest matchup
        const { data: matchups, error: matchupError } = await supabase
            .from('matchups')
            .select('match_id, opp_league, player_id')
            .order('date', { ascending: false })
            .limit(1);

        if (matchupError) throw matchupError;
        if (!matchups || matchups.length === 0) {
            setMessage("No matchup data found.");
            return;
        }

        const latestMatchup = matchups[0];
        const { match_id, opp_league } = latestMatchup;

        // Fetch all players associated with the latest match_id
        const { data: playersData, error: playersError } = await supabase
            .from('matchups')
            .select('player_id, players(name)')
            .eq('match_id', match_id);

        if (playersError) throw playersError;

        // Define the predefined order for the 14 players
        const predefinedOrder = [
            "StoriKobane",
            "SuperJett",
            "SuperChip",
            "Smileybchezzta",
            "Forgot-to-Wipe",
            "Quarterbubble",
            "Noliaclap504",
            "STBmazzy",
            "PipeLayer69",
            "TexanJoe84",
            "TheBronze",
            "Prince",
            "KobaneKrazy",
            "Chief"
        ];

        // Separate matching players and others
        const matchingPlayers = [];
        const remainingPlayers = [];

        playersData.forEach(player => {
            if (predefinedOrder.includes(player.players.name)) {
                matchingPlayers.push(player);
            } else {
                remainingPlayers.push(player);
            }
        });

        // Sort matching players by predefined order
        matchingPlayers.sort((a, b) => predefinedOrder.indexOf(a.players.name) - predefinedOrder.indexOf(b.players.name));

        // Shuffle the remaining players randomly
        const shuffledRemaining = remainingPlayers.sort(() => Math.random() - 0.5);

        // Combine sorted and shuffled lists
        const sortedPlayersData = [...matchingPlayers, ...shuffledRemaining];

        // Map player data into the required table format
        const tableData = sortedPlayersData.map(player => ({
            player_id: player.player_id,
            PlayerName: player.players.name,
            score: "",
            Fumbles: "",
            DefensiveStops: "",
            DefensiveScore: ""
        }));

        setTableData(tableData);
        setMessage(`Loaded matchup against ${opp_league}.`);
    } catch (error) {
        setMessage(`Error loading matchup: ${error.message}`);
    }
};


        fetchMatchup();
    }, []);

    const handleImageUpload = (e) => {
        if (e.target.files.length > 3) {
            setMessage("You can upload a maximum of 3 images.");
            return;
        }
        setImages([...e.target.files]);
    };

    const handleAnalyze = async () => {
        setMessage("Analyzing images...");
        try {
            // Placeholder logic for extracting scores from images
            const extractedScores = {
                Player1: 20,
                Player2: 15,
                Player3: 18
                // Add other players as needed
            };

            const updatedTable = tableData.map(player => ({
                ...player,
                score: extractedScores[player.PlayerName] || player.score
            }));

            setTableData(updatedTable);
            setMessage("Scores updated from images.");
        } catch (error) {
            setMessage(`Error analyzing images: ${error.message}`);
        }
    };

    const handleTableChange = (index, field, value) => {
        const updatedData = [...tableData];
        updatedData[index][field] = value;
        setTableData(updatedData);
    };

    const handleSave = async () => {
        setMessage("Saving stats...");
        try {
            const rows = tableData.map(player => ({
                player_id: player.player_id,
                score: parseInt(player.score, 10),
                fumbles: parseInt(player.Fumbles, 10) || 0,
                defensive_stops: parseInt(player.DefensiveStops, 10) || 0,
                defensive_score: parseInt(player.DefensiveScore, 10) || 0
            }));

            const { error } = await supabase.from('daily_stats').insert(rows);

            if (error) throw error;

            setMessage("Stats successfully saved!");
        } catch (error) {
            setMessage(`Error saving stats: ${error.message}`);
        }
    };

    return (
        <div className="stats-update">
            <h1>Update Player Stats</h1>
            <div className="form-group">
                <label htmlFor="imageUpload">Upload Images</label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                />
            </div>
            <button onClick={handleAnalyze}>Analyze</button>

            {message && <p className="message">{message}</p>}

            <div className="table-container">
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Score</th>
                            <th>Fumbles</th>
                            <th>Defensive Stops</th>
                            <th>Defensive Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((player, index) => (
                            <tr key={index}>
                                <td>{player.PlayerName}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={player.score}
                                        onChange={(e) => handleTableChange(index, "score", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={player.Fumbles}
                                        onChange={(e) => handleTableChange(index, "Fumbles", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={player.DefensiveStops}
                                        onChange={(e) => handleTableChange(index, "DefensiveStops", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={player.DefensiveScore}
                                        onChange={(e) => handleTableChange(index, "DefensiveScore", e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={handleSave}>Save Stats</button>
        </div>
    );
};

export default StatsUpdate;
