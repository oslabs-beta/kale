import React from 'react';
import { Link } from 'react-router-dom';
import ClusterInput from '../components/ClusterInput';
import NavBar from '../components/Navbar';

export default function WelcomePage() {
  return (
    <>
      <NavBar title="Home" />
      <div>
        <h2 className="text-red-900">Welcome, Jeff</h2>
      </div>
      <div>
        <ClusterInput />
      </div>
    </>
  );
}
