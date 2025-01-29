import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../components/Navbar'; 
import './../styles/hero.css';

function Video() {
    
      
      

  return (
    <div>
      <Navbar />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '4rem', 
          overflowY: 'auto', 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'column', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', textAlign: 'center', margin: '0.5rem', color: 'gold' }}>
                EN COURS DE CONSTRUCTION
            </h1>
            </div>
        
      </div>
    </div>
  );
}

export default Video;
