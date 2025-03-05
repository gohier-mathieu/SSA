import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './../styles/guide.css';

function Guide() {
 
  const articles = [
    { id: 1, title: 'Tableau du niveau des batiments à avoir pour monter votre QG', imageUrl: 'img/divers/qg.png' },
    { id: 2, title: 'Nombre de piéces de drones dont vous avez besoin pour chaque palier de drone', imageUrl: 'img/divers/drone.png' },
    { id: 3, title: 'Ressources nécessaires pour mettre des étoiles sur vos équipements lvl40 (à faire si votre team est full équipements oranges) ', imageUrl: 'img/divers/etoiles.png' },
    { id: 3, title: "Nombre de pierres d'amélioration par level d'équipement\nmontez par palier de 10\ncouts par palier:\n,de 0 a 10 >20 800 pierres\n,de 11 a 20 > 38 800 pierres\n,de 21 a 30 > 58 200 pierres\n,de 31 a 40 > 76 200 pierres  ", imageUrl: 'img/divers/pierre.png' },
    { id: 3, title: 'Badges de competences', imageUrl: 'img/divers/badges.jpg' },
  ];

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
