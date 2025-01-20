import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import de la barre de navigation
import './../styles/guide.css';

function Guide() {
  // Exemple de données pour les articles
  const articles = [
    { id: 1, title: 'Tableau du niveau des batiments à avoir pour monter votre QG', imageUrl: 'img/divers/qg.png' },
    { id: 2, title: 'Nombre de piéces de drones dont vous avez besoin pour chaque palier de drone', imageUrl: 'img/divers/drone.png' },
    { id: 3, title: 'Ressources nécessaires pour mettre des étoiles sur vos équipements lvl40 (à faire si votre team est full équipements oranges) ', imageUrl: 'img/divers/etoiles.png' },
  ];

  return (
    <div>
      {/* Affichage de la barre de navigation */}
      <Navbar />

      {/* Contenu principal de la page */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '4rem', // Espace sous la navbar pour éviter un chevauchement
          overflowY: 'auto', // Permet le défilement si nécessaire
        }}
      >
        {articles.map((article) => (
          <Link
            to={`/article/${article.id}`}
            key={article.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="article">
              <h3>{article.title}</h3>
              <img src={article.imageUrl} alt={article.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Guide;
