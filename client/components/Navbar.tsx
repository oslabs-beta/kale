import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/history">History</Link>
    </div>
  );
}
