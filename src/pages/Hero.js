import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../components/Navbar'; 
import './../styles/hero.css';

function Hero() {
  const articles = [
    { id: 1, title: 'Tank', imageUrl: 'img/hero/tank.png' },
    { id: 2, title: 'Missile', imageUrl: 'img/hero/missile.png' },
    { id: 3, title: 'Avion', imageUrl: 'img/hero/avion.png' },
    { id: 4, title: "Privilégiez les teams complètes dans une catégories pour un maximum de dégâts", imageUrl: 'img/hero/rapport.png' },
    { id: 5, title: 'Nombre de fragments nécessaires pour chaque partie des étoiles du héros', imageUrl: 'img/hero/etoiles.png' },
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'column', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', textAlign: 'center', margin: '0.5rem', color: 'gold' }}>
                Créez vos teams en fonction de leur catégorie (tank, missile, avion) en mettant devant ceux avec le bouclier
            </h1>
            <img
                src="img/hero/bouclier.png"
                alt="Bouclier"
                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
            </div>
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

export default Hero;
