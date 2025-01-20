import React from 'react';
import "./../styles/tpvs.css";
import Navbar from './../components/Navbar';

function Tpvs() {
  return (
    <div>
      {/* Affichage de la barre de navigation */}
      <Navbar />

    <div className="tpvs-container">
      {/* Texte rouge au-dessus de la vidéo */}
      <p className="tpvs-text">La place au centre est réservée pour l'évenement maréchall et celles autour pour les R5 et R4, et merci de serrer et de vous aligner par rapports a ceux du centre.</p>

      {/* Vidéo intégrée */}
      <video className="tpvs-video" controls>
        <source src="video/205554.mp4" type="video/mp4" />
        {/* Message pour les navigateurs qui ne supportent pas les vidéos */}
        Your browser does not support the video tag.
      </video>
    </div>
    </div>
  );
}

export default Tpvs;
