import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HouseDetail from './pages/HouseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AddHouse from './pages/AddHouse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/house/:id" element={<HouseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-house" element={<AddHouse />} />
      </Routes>
    </Router>
  );
}

export default App;
