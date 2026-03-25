import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  // 30+ PS5 Games ka Data (Topic 3.1 & 4.1)
  const ps5GamesPool = [
    { name: "Spider-Man 2", desc: "Peter Parker and Miles Morales team up to fight Venom." },
    { name: "God of War Ragnarok", desc: "Kratos and Atreus prepare for the battle of the Nine Realms." },
    { name: "Horizon Forbidden West", desc: "Aloy journeys into a majestic but dangerous new frontier." },
    { name: "Ghost of Tsushima", desc: "Samurai Jin Sakai fights for the freedom of Tsushima." },
    { name: "The Last of Us Part I", desc: "A rebuilt emotional journey in a post-pandemic world." },
    { name: "Ratchet & Clank: Rift Apart", desc: "Blast your way through an interdimensional adventure." },
    { name: "Returnal", desc: "A shape-shifting world where death is just the beginning." },
    { name: "Elden Ring", desc: "Rise, Tarnished, and wield the power of the Elden Ring." },
    { name: "Final Fantasy VII Rebirth", desc: "The journey continues beyond Midgar in this epic RPG." },
    { name: "Cyberpunk 2077", desc: "An open-world action-adventure set in Night City." },
    { name: "Hogwarts Legacy", desc: "Experience Hogwarts in the 1800s as a wizard student." },
    { name: "Resident Evil 4 Remake", desc: "Survival horror reimagined with modern gameplay." },
    { name: "Baldur's Gate 3", desc: "Gather your party in the ultimate D&D RPG experience." },
    { name: "Gran Turismo 7", desc: "The ultimate driving simulator with stunning next-gen graphics." },
    { name: "Stray", desc: "Explore a neon-lit cybercity as a lost stray cat." },
    { name: "Demon's Souls", desc: "The classic dark fantasy RPG rebuilt from the ground up." },
    { name: "Deathloop", desc: "Two rival assassins trapped in a mysterious timeloop." },
    { name: "Star Wars Jedi: Survivor", info: "The story of Cal Kestis continues across the galaxy." },
    { name: "Mortal Kombat 1", desc: "A reborn Universe created by the Fire God Liu Kang." },
    { name: "Tekken 8", desc: "Next-gen graphics and legendary fighting action." },
    { name: "Alan Wake 2", desc: "A ritualistic murder mystery in the town of Bright Falls." },
    { name: "Dead Space", desc: "A sci-fi survival horror classic rebuilt for PS5." },
    { name: "Street Fighter 6", desc: "A new era of fighting games with innovative controls." },
    { name: "Assassins Creed Valhalla", desc: "Lead epic Viking raids across England." },
    { name: "Hades", desc: "Hack and slash your way out of the Greek Underworld." },
    { name: "Helldivers 2", desc: "Squad-based shooter to spread democracy across the galaxy." },
    { name: "Kena: Bridge of Spirits", desc: "A story-driven action adventure with cute spirits." },
    { name: "Dead Island 2", desc: "A unique blend of horror, dark humor, and zombie-slaying." },
    { name: "It Takes Two", desc: "The ultimate co-op adventure journey." },
    { name: "Sackboy: A Big Adventure", desc: "A colorful 3D platforming adventure." },
    { name: "Persona 5 Royal", desc: "The definitive edition of the award-winning RPG." },
    { name: "The Witcher 3: Next Gen", desc: "Geralt's hunt across the Continent with PS5 upgrades." }
  ];

  // Random state setup (Topic 5.1 & 6.1)
  const [suggestion, setSuggestion] = useState(ps5GamesPool[0]);

  const rollGame = () => {
    // Random selection logic
    const randomIndex = Math.floor(Math.random() * ps5GamesPool.length);
    setSuggestion(ps5GamesPool[randomIndex]);
  };

  return (
    <div className="app-container">
      <Header />
      
      {/* Sirf ek card jo click par change hoga (Topic 3.1) */}
      <div className="suggestion-box" key={suggestion.name}>
        <span style={{ 
          background: '#fff0eb', 
          color: '#ff8a65', 
          padding: '5px 15px', 
          borderRadius: '20px', 
          fontSize: '0.7rem',
          fontWeight: 'bold'
        }}>
          PS5 GAME PICKER
        </span>
        
        <h2 className="game-title">🎮 {suggestion.name}</h2>
        <p className="game-desc">{suggestion.desc}</p>
        
        <button className="roll-btn" onClick={rollGame}>
          🎲 Roll for Next Game
        </button>
      </div>

      <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#aaa' }}>
        Total Games in Pool: {ps5GamesPool.length}
      </p>
    </div>
  );
}

export default App;