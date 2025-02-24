// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Vs from './pages/Vs';
import Pillage from './pages/Pillage';
import Tpvs from './pages/Tpvs';
import Landing from './pages/Landing';
import Cascade from './pages/Cascade';
import Guide from './pages/Guide';
import Hero from './pages/Hero';
import Event from './pages/Event';
import Video from './pages/Video';
import GridMap from './pages/GridMpa';
import Bye from './pages/Bye';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vs" element={<Vs />} />
        <Route path="/pillage" element={<Pillage />} />
        <Route path="/tpvs" element={<Tpvs />} />
        <Route path="/cascade" element={<Cascade />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/event" element={<Event/>} />
        <Route path="/video" element={<Video/>} />
        <Route path="/gridMap" element={<GridMap/>} />
        <Route path="/bye" element={<Bye/>} />
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>
    </div>
  );
}

export default App;