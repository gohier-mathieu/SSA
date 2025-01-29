import React from 'react';
import "./../styles/tpvs.css";
import Navbar from './../components/Navbar';

function Tpvs() {
  return (
    <div>
      <Navbar />

    <div className="tpvs-container">
    
      <p className="tpvs-text">La place au centre est réservée pour l'évenement maréchall et celles autour pour les R5 et R4, et merci de serrer et de vous aligner par rapports a ceux du centre.</p>

     
      <video className="tpvs-video" controls>
        <source src="video/205554.mp4" type="video/mp4" />
       
        Your browser does not support the video tag.
      </video>
    </div>
    </div>
  );
}

export default Tpvs;
