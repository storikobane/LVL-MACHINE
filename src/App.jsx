import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import MatchupUpload from './pages/MatchupUpload';
import MatchupGen from './pages/MatchupGen';
import Home from './pages/Home';
import Lineups from './pages/Lineups';
import MatchHistory from './pages/MatchHistory';
import Matchups from './pages/Matchups';
import Stats from './pages/Stats';
import StatsDaily from './pages/StatsDaily';
import StatsWeekly from './pages/StatsWeekly';
import StatsDef from './pages/StatsDef';
import StatsUpdate from './pages/StatsUpdate';
import ReorderPlayers from './pages/ReorderPlayers';

function App() {
  return (
    <Router>
      {/* Render Navbar on every page */}
      <Navbar />
      <Routes>
        {/* Define all application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/lineups" element={<Lineups />} />
        <Route path="/matchups" element={<Matchups />} />
        <Route path="/matchhistory" element={<MatchHistory />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/statsdaily" element={<StatsDaily />} />
        <Route path="/statsweekly" element={<StatsWeekly />} />
        <Route path="/statsdef" element={<StatsDef />} />
        <Route path="/statsupdate" element={<StatsUpdate />} />
        <Route path="/reorder" element={<ReorderPlayers />} />
        <Route path="/matchupUpload" element={<MatchupUpload />} />
        <Route path="/matchupGen" element={<MatchupGen />} />
      </Routes>
    </Router>
  );
}

export default App;
