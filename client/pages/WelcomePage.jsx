import React from 'react';
import ClusterInput from '../components/clusterInput.jsx';
import NavBar from '../components/Navbar.jsx';

export default function WelcomePage() {
  return (
    <div>
      <h1>Kale</h1>
      <div>
        <NavBar />
      </div>
      <div>
        <h2>Welcome, Jeff</h2>
      </div>
      <div>
        <ClusterInput />
      </div>
    </div>
  );
}
