import React, { useState, useEffect } from "react";
import { Home, Search } from "lucide-react";
import playersData from "./players.json";
import "./../styles/gridMap.css";

const GRID_WIDTH = 12;
const GRID_HEIGHT = 9;
const START_X = 553;
const START_Y = 438;
const MARECHALL_X = 562;
const MARECHALL_Y = 450;
const GAP = 3;
const MAX_X = 586;

const isPositionOccupied = (x, y, positions) => {
  return positions.some(pos => pos.x === x && pos.y === y);
};

const getValidPosition = (positions) => {
  for (let col = 0; col < GRID_WIDTH && (START_X + col * GAP) <= MAX_X; col++) {
    const x = START_X + col * GAP;
    for (let row = 0; row < GRID_HEIGHT; row++) {
      const y = START_Y + row * GAP;
      if (!isPositionOccupied(x, y, positions)) {
        return { x, y };
      }
    }
  }
  
  for (let x = START_X; x <= MAX_X; x += GAP) {
    for (let y = START_Y; y <= START_Y + (GRID_HEIGHT - 1) * GAP; y += GAP) {
      if (!isPositionOccupied(x, y, positions)) {
        return { x, y };
      }
    }
  }
  return { x: START_X, y: START_Y };
};

const isValidPosition = (x, y) => {
  return x >= START_X && 
         x <= MAX_X && 
         y >= START_Y && 
         y <= START_Y + (GRID_HEIGHT - 1) * GAP;
};

const generatePositions = (players) => {
  let positions = [{ id: 1, name: "Marechall", x: MARECHALL_X, y: MARECHALL_Y }];
  let layer = 1;
  let index = 1;
  
  while (index < players.length) {
    let sideLength = layer * 2;
    let startX = MARECHALL_X - (layer * GAP);
    let startY = MARECHALL_Y + (layer * GAP);
    let positionsNeeded = sideLength * 4;
  
    for (let i = 0; i < positionsNeeded && index < players.length; i++) {
      let offsetX = 0, offsetY = 0;
  
      if (i < sideLength) {
        offsetX = i * GAP;
      } else if (i < sideLength * 2) {
        offsetX = sideLength * GAP;
        offsetY = (i - sideLength) * GAP;
      } else if (i < sideLength * 3) {
        offsetX = (sideLength - (i - 2 * sideLength)) * GAP;
        offsetY = sideLength * GAP;
      } else {
        offsetY = (sideLength - (i - 3 * sideLength)) * GAP;
      }
  
      let newX = startX + offsetX;
      let newY = startY - offsetY;
        
      if (!isValidPosition(newX, newY) || newX > MAX_X) {
        const validPos = getValidPosition(positions);
        newX = validPos.x;
        newY = validPos.y;
      }

      if (isPositionOccupied(newX, newY, positions)) {
        const validPos = getValidPosition(positions);
        newX = validPos.x;
        newY = validPos.y;
      }

      positions.push({
        id: players[index].id,
        name: players[index].name,
        x: newX,
        y: newY
      });
  
      index++;
    }
    layer++;
  }

  return positions;
};

const GridMap = () => {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [foundPlayer, setFoundPlayer] = useState(null);

  useEffect(() => {
    setPlayers(generatePositions(playersData));
  }, []);

  const handleSearch = () => {
    const result = players.find(p => p.name.toLowerCase() === search.toLowerCase());
    if (result) {
      setFoundPlayer(result);
    } else {
      alert("Joueur introuvable");
    }
  };

  const generateGrid = () => {
    const grid = [];
    const playerPositions = players.map(player => ({ x: player.x, y: player.y, name: player.name }));

    for (let row = 0; row < GRID_HEIGHT; row++) {
      for (let col = 0; col < GRID_WIDTH; col++) {
        const x = START_X + col * GAP;
        const y = START_Y + (GRID_HEIGHT - 1 - row) * GAP;

        const playerInCell = playerPositions.find(p => p.x === x && p.y === y);

        grid.push({ x, y, row, col, player: playerInCell });
      }
    }
    return grid;
  };

  return (
    <div className="container grid-map-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un joueur"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <Search size={16} className="mr-1" /> Rechercher
        </button>
        {foundPlayer && (
          <p className="search-result">
            📍 {foundPlayer.name} est en X: {foundPlayer.x}, Y: {foundPlayer.y}
          </p>
        )}
      </div>

      <div className="grid-container">
        {generateGrid().map((cell, index) => (
          <div key={index} className="grid-item" style={{ border: '1px solid #ccc', height: '40px', width: '40px', position: 'relative' }}>
          {/* Si un joueur est présent */}
          {cell.player ? (
            <>
              <span
                className="player-name"
                style={{
                  position: 'absolute',
                  top: '80%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '8px',
                  color: '#fff', // Texte en blanc
                }}
              >
                {cell.player.name}
              </span>
              {/* L'icône de la maison avec la couleur appropriée */}
              <Home
                size={24}
                color={cell.player.name === 'Marechall' ? 'orange' : 'blue'}
                className={foundPlayer && foundPlayer.name === cell.player.name ? 'blinking' : ''}  
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.8, // Icône de la maison semi-transparente
                }}
              />
            </>
          ) : (
            // Si aucun joueur n'est présent, afficher une maison grise avec opacité transparente
            <Home
              size={24}
              color="gray"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.3, // Opacité faible pour les cases vides
              }}
            />
          )}
        </div>
        
        
        
        ))}
      </div>
    </div>
  );
};

export default GridMap;

