import React, { useState, useEffect } from 'react';
    import { supabase } from '../supabaseClient';

    function Home() {
      const [matchup, setMatchup] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchMatchup = async () => {
          try {
            const today = new Date().toISOString().split('T')[0];
            const { data, error } = await supabase
              .from('matchups')
              .select('description')
              .eq('date', today)
              .single();

            if (error) {
              console.error('Error fetching matchup:', error);
              setMatchup(null);
            } else {
              setMatchup(data ? data.description : null);
            }
          } catch (error) {
            console.error('Unexpected error:', error);
            setMatchup(null);
          } finally {
            setLoading(false);
          }
        };

        fetchMatchup();
      }, []);

      if (loading) {
        return <p>Loading...</p>;
      }

      return (
        <div>
          <h2>Welcome to the LVL Machine</h2>
          <div className="matchup-card">
            <h3>Today's Matchup</h3>
            <p>{matchup ? matchup : 'No Matchup Available'}</p>
          </div>
        </div>
      );
    }

    export default Home;
