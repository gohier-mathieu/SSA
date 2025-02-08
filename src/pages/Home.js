import React from 'react';
import { Link } from 'react-router-dom';
import "./../styles/home.css";
import Navbar from '../components/Navbar';
import Soldier from '../components/Soldier';

function Home() {
  const buttons = [
    { route: "/vs", label: "VS" },
    { route: "/pillage", label: "Pillage" },
    { route: "/tpvs", label: "téléportation vs" },
    { route: "/cascade", label: "Cascade" },
    { route: "/Guide", label: "Guide pratique" },
    { route: "/hero", label: "Hero" },
    { route: "/event", label: "Event" },
    /*{ route: "/video", label: "Video" },*/
    { route: "/gridMap", label: "GridMap" },
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
      <div className="soldier-canvas">
      <Soldier/>
      </div>
    </div>
  );
}

export default Home;