import React from 'react';
import { Link } from 'react-router-dom';
import ClusterInput from '../components/ClusterInput';
import NavBar from '../components/Navbar';

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