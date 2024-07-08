import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Component from './Component';
import Register from './Register';

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/"  element={<Component /> }  />
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
