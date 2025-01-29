import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../components/Navbar'; 
import './../styles/hero.css';

function Event() {
    const articles = [
        { 
          id: 1, 
          title: 'Général', 
          description: "Votre T1 fait entre 6 à 9m prenez le lvl4.\nVotre T1 fait entre 9 à 12m prenez le lvl5.\nVotre T1 fait entre 12 à 16m prenez le lvl6.\nLe but étant de le faire solo voir des ralliements à partir de l'étape 28.\n", 
          imageUrl: 'img/divers/general.png' 
        },
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
                EVENT
            </h1>
            </div>
        {articles.map((article) => (
          <Link
            to={`/article/${article.id}`}
            key={article.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="article">
              <h3>{article.title}</h3>
              <p className="article-description">
                {article.description.split('\n').map((line, index) => (
                    <span key={index}>
                    {line}
                    <br />
                    </span>
                ))}
              </p>

              <img src={article.imageUrl} alt={article.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Event;
