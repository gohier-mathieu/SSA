import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../components/Navbar'; // Import de la barre de navigation
import './../styles/pillage.css';

function Pillage() {
  // Exemple de données pour les articles
  const articles = [
    { id: 1, title: 'Piller des camions et quêtes en dehors du serveur', imageUrl: 'img/pillage/1.png' },
    { id: 2, title: 'Cochez la case pour éviter de piller un camion de notre serveur (si vs inter serveur "duel de zone de guerre" privilégiez ce serveur ', imageUrl: 'img/pillage/2.png' },
    { id: 3, title: 'Vous pouvez soit piller le camion ou aller chercher des quêtes en dézoomant ', imageUrl: 'img/pillage/3.png' },
    { id: 5, title: "Privilégiez les caisses jaunes minimum niveau 3, pour un max d'xp", imageUrl: 'img/pillage/5.png' },
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

export default Pillage;
