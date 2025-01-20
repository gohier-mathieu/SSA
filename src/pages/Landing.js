import React from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from '../components/Canvas';


const Landing = () => {
  const navigate = useNavigate();

  const handleEnterSite = () => {
    // Naviguer vers home
    navigate('/home');
    // Forcer le rafraîchissement après la navigation
    window.location.reload();
  };

  return (
    <div className="landing-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      {/* Canvas pour l'arrière-plan */}
      <div className="canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas />
      </div>

      {/* Bouton pour rediriger vers la page Home */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: 'gold',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          onClick={handleEnterSite}
        >
          Enter the site
        </button>
      </div>
    </div>
  );
};

export default Landing;