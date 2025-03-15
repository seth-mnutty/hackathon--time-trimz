// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import UserDashboard from './UserDashboard';
import BusinessDescription from './BusinessDescription';
import UserPage from './UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/:name" element={<Login />} />
        <Route path="/user/:name" element={<UserPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/BusinessDescription" element={<BusinessDescription />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;