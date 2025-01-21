import React, { useState } from "react";
import "./../styles/vs.css";

const App = () => {
  const [selectedDay, setSelectedDay] = useState("");

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const daysContent = {
    monday: [
      {
        img: "img/monday/Capture d'écran 2025-01-13 084720.png",
        text: "Faites vos tâches radars cumulées depuis samedi soir (le stock en haut doit être plein lundi matin).",
      },
      {
        img: "img/monday/Capture d'écran 2025-01-13 084745.png",
        text: "Utilisez toute votre endurance.",
      },
      {
        img: "img/monday/Capture d'écran 2025-01-13 084802.png",
        text: "Utilisez votre xp pour le héros (sans ouvrir les coffres que vous gardez pour le jeudi).",
      },
      {
        img: [
          "img/monday/Capture d'écran 2025-01-13 084905.png",
          "img/monday/Capture d'écran 2025-01-13 084827.png",
          "img/monday/Capture d'écran 2025-01-13 084839.png",
        ],
        text: "Envoyez vos teams dans des mines à partir du dimanche soir (points attribués une fois sorti de la mine).",
      },
      {
        img: "img/monday/Capture d'écran 2025-01-13 085052.png",
        text: "Utilisez l'xp drone avec les pièces de drone si cela est possible.",
      },
    ],
    tuesday: [
      { text: "Ne faites pas vos radars aujourd'hui !!!", warning: true },
      {
        img: "img/tuesday/Capture d'écran 2025-01-13 102513.png",
        text: "Effectuez 1 tâche secrète légendaire.",
      },
      {
        img: "img/tuesday/Capture d'écran 2025-01-13 102533.png",
        text: "Envoyez un camion commercial légendaire.",
      },
      {
        img: "img/tuesday/Capture d'écran 2025-01-13 102550.png",
        text: "Utilisez 1 minute d'accélération de construction.",
      },
      {
        img: "img/tuesday/Capture d'écran 2025-01-13 102611.png",
        text: "Ouvrez vos cadeaux de constructions que vous avez faits depuis vendredi.",
      },
      {
        img: "img/tuesday/Capture d'écran 2025-01-13 103457.png",
        text: "Recrutez les survivants.",
      },
    ],
    wednesday: [
      {
        img: "img/monday/Capture d'écran 2025-01-13 084720.png",
        text: "Faites vos tâches radars cumulées depuis mardi matin (le stock en haut doit être plein lundi matin).",
      },
      {
        img: "img/wednesday/Capture d'écran 2025-01-13 104051.png",
        text: "Faites le maximum de recherches dans la journée.",
      },
      {
        img: "img/wednesday/Capture d'écran 2025-01-13 104109.png",
        text: "Pour vos recherches, privilégiez celles avec les badges de valeur.",
      },
      {
        img: "img/wednesday/Capture d'écran 2025-01-13 104029.png",
        text: "Utilisez des accélérateurs pour vos recherches.",
      },
      {
        img: "img/wednesday/Capture d'écran 2025-01-13 104156.png",
        text: "Ouvrez vos caisses de drones sans toucher au drone et si possible après 19h.",
      },
    ],
    thursday: [
      { text: "Ne faites pas vos radars aujourd'hui !!!", warning: true },
      {
        img: "img/thursday/Capture d'écran 2025-01-13 102647.png",
        text: "Effectuez un recrutement avancé.",
      },
      {
        img: "img/monday/Capture d'écran 2025-01-13 084802.png",
        text: "Utilisez votre xp pour le héros (sans ouvrir les coffres que vous gardez pour le jeudi).",
      },
      {
        img: "img/thursday/Capture d'écran 2025-01-13 105715.png",
        text: "Utilisez vos XP en caisses.",
      },
      {
        img: "img/thursday/Capture d'écran 2025-01-13 105704.png",
        text: "Utilisez vos médailles de compétences.",
      },
      {
        img: "img/thursday/Capture d'écran 2025-01-13 105723.png",
        text: "Utilisez vos fragments héros.",
      },
      {
        img: "img/thursday/Capture d'écran 2025-01-21 141252.png",
        text: "Utilisez ces coffres pour recruter des heros ou améliorer ceux que vous avez.",
      },
    ],
    friday: [
      {
        img: "img/monday/Capture d'écran 2025-01-13 084720.png",
        text: "Faites vos tâches radars cumulées depuis jeudi matin (le stock en haut doit être plein lundi matin).",
      },
      {
        img: "img/tuesday/Capture d'écran 2025-01-13 102611.png",
        text: "Ouvrez vos cadeaux de constructions que vous avez faits depuis vendredi.",
      },
      {
        img: "img/tuesday/Capture d'écran 2025-01-13 102550.png",
        text: "Utilisez 1 minute d'accélération de construction.",
      },
      {
        img: "img/wednesday/Capture d'écran 2025-01-13 104051.png",
        text: "Faites le maximum de recherches dans la journée.",
      },
      {
        img: "img/wednesday/Capture d'écran 2025-01-13 104029.png",
        text: "Utilisez des accélérateurs pour vos recherches.",
      },
      {
        img: "img/friday/Capture d'écran 2025-01-13 111550.png",
        text: "Formez le maximum de soldats en utilisant la méthode de cascade si vous le pouvez.",
      },
      {
        img: "img/friday/Capture d'écran 2025-01-13 111613.png",
        text: "Utilisez des accélérateurs pour vos formations de soldats.",
      },
    ],
    saturday: [
      {
        img: "img/saturday/Capture d'écran 2025-01-13 112654.png",
        text: "Mettez-vous sous protection entre samedi 3h et dimanche 3h. Faites attention à l'heure de fin de votre première protection.",
        warning: true,
      },
    ],
    sunday: [
      { text: "Ne faites pas vos radars aujourd'hui !!!", warning: true },
      { text: "Envoyez vos teams pour récolter pour finir après 3h du matin.", warning: true },
      { text: "Préparez le VS à venir (constructions, XP, ...).", warning: true },
    ],
  };

  return (
    <div className="app">
      <div className="overlay">
        <div className="container">
          <div className="logo-container">
            <img
              className="logo"
              src="img/img/image__3_-removebg-preview.png"
              alt="Logo"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <div className="day-container">
            <select
              id="daySelector"
              value={selectedDay}
              onChange={handleDayChange}
            >
              <option value="">-- Choisissez un jour --</option>
              <option value="monday">Lundi</option>
              <option value="tuesday">Mardi</option>
              <option value="wednesday">Mercredi</option>
              <option value="thursday">Jeudi</option>
              <option value="friday">Vendredi</option>
              <option value="saturday">Samedi</option>
              <option value="sunday">Dimanche</option>
            </select>
          </div>
          <div id="content">
            {selectedDay && (
              <div className="day-content">
                {daysContent[selectedDay]?.map((article, index) => (
                  <article key={index} className="article">
                    {article.img && (
                      <div className="image-container">
                        {Array.isArray(article.img) ? (
                          article.img.map((imgSrc, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={imgSrc}
                              alt={`Illustration pour le contenu de ${selectedDay}`}
                              />

                          ))
                        ) : (
                          <img 
                            src={article.img} 
                            alt={article.description || `Illustration pour ${selectedDay}`} 
                          />
                        )}
                      </div>
                    )}
                    <p className={article.warning ? "warning-text" : ""}>
                      {article.text}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
