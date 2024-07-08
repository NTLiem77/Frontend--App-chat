import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Component from './Component';
import Register from './Register';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/"  element={<Component /> }  />
              <Route path="/home" element={<Component/>} />
              <Route path="/login" element={<Component/>}/>
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
