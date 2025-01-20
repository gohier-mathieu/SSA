import React from 'react';
import { Link } from 'react-router-dom';
import "./../styles/home.css";
import Navbar from '../components/Navbar';

function Home() {
  // Définir les chemins et les labels pour chaque bouton
  const buttons = [
    { route: "/vs", label: "VS" },
    { route: "/pillage", label: "Pillage" },
    { route: "/tpvs", label: "téléportation vs" },
    { route: "/cascade", label: "Cascade" },
    { route: "/Guide", label: "Guide pratique" },
    { route: "/hero", label: "Hero" },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >
      {/* Affichage de la barre de navigation */}
      <Navbar />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '3rem',
        }}
      >
        {buttons.map((button, index) => (
          <Link to={button.route} key={index}>
            <button className={`flame flame${index + 1}`}>
              {button.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
