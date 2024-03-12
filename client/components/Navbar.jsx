import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <Link to="/history">History</Link>
      <Link to="/signin">Log out</Link>
    </div>
  );
}
