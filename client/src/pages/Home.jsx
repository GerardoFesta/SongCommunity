import React from 'react';
import logo from '../style/home.png';

const WelcomePage = () => {
  return (
    <div className="container text-center mt-5">
      <img src={logo} alt="Logo" className="mb-4" />
      <h1>Benvenuto al nostro sito</h1>
      <p>Scopri le ultime novità musicali e trova le tue canzoni preferite.</p>
    </div>
  );
}

export default WelcomePage;
