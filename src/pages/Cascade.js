import React from 'react';
import Navbar from './../components/Navbar'; // Import de la barre de navigation
import './../styles/pillage.css';

function Cascade() {
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
          padding: '1rem', // Espacement interne pour un rendu agréable
          maxWidth: '800px', // Limiter la largeur du contenu
          margin: '4rem auto', // Centrer horizontalement le contenu
        }}
      >
        {/* Titre */}
        <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1.5rem', color: 'gold'}}>
          La Cascade : Technique ultime pour augmenter vos puissances
        </h1>

        {/* Image */}
        <img
          src="img/divers/cascade.jpg"
          alt="La Cascade"
          style={{
            width: '60%',
            maxWidth: '400px',
            height: 'auto',
            marginBottom: '1.5rem',
            borderRadius: '8px',
          }}
        />

        {/* Texte explicatif */}
        <p style={{ lineHeight: '1.6', textAlign: 'justify', marginBottom: '1rem', color:'white' }}>
          La cascade est <strong>LA technique ultime</strong> et simple pour augmenter <strong>RAPIDEMENT</strong> vos
          deux Puissances <strong>EN MÊME TEMPS</strong>. Le système est simple :
        </p>

        {/* Liste des étapes */}
        <ol style={{ lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' , color:'white'}}>
          <li>
            <strong>On monte toujours notre Caserne #1</strong> à son niveau maximum (celui de notre QG).
          </li>
          <li>
            <strong>On maintient nos casernes secondaires,</strong> chacune un niveau de Troupes plus bas que la
            précédente :
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Exemple : Je suis niveau 18 :</li>
              <li>Ma Caserne #1 est niveau 18 (Troupes niveau 6 depuis le niveau 17).</li>
              <li>Ma Caserne #2 est niveau 14 (Troupes niveau 5).</li>
              <li>Ma Caserne #3 est niveau 10 (Troupes niveau 4).</li>
              <li>Ma Caserne #4 est niveau 7 (Troupes niveau 3).</li>
            </ul>
          </li>
          <li>
            <strong>Le but :</strong> FORMER des Troupes Niveau 3 avec ma Caserne #4 (Niv. 7).
          </li>
          <li>
            Pendant ce temps, je fais des <strong>PROMOTIONS</strong> (en cliquant sur le Terrain d'Entrainement) de mes
            Troupes Bas Niveau vers le Niveau au-dessus, avec chaque autre caserne.
          </li>
          <li>
            La <strong>CRÉATION</strong> de Troupes bas niveau, puis leur <strong>PROMOTION</strong> en troupes plus haut
            niveau, avec les autres Casernes, en cascade, est :
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Beaucoup plus rapide</li>
              <li>Moins coûteuse en ressources</li>
            </ul>
          </li>
          <li>
            Les Promotions étant beaucoup plus courtes, elles permettent de produire plusieurs lots de troupes pour
            chaque Caserne pendant une même session de 4 heures de la Course aux Armements (CAA), et ainsi de marquer
            plus facilement des points pour le classement et les récompenses.
          </li>
        </ol>

        {/* Fin de l'explication */}
        <p style={{ lineHeight: '1.6', textAlign: 'justify', marginBottom: '1rem' }}>
          Cette méthode vous permet de maximiser votre progression tout en économisant vos ressources.
        </p>
      </div>
    </div>
  );
}

export default Cascade;
