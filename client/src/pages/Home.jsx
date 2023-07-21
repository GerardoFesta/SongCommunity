import React from 'react';
import logo from '../style/home.png';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';






const WelcomePage = () => {
  let navigate = useNavigate()
  const location = useLocation();
  if(location.pathname === '/logout'){
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
    navigate('/Home')
  }
  return (
    <div className="container text-center mt-5">
      <img src={logo} alt="Logo" className="mb-4" />
      <h1>Benvenuto al nostro sito</h1>
      <p>Scopri le ultime novità musicali e trova le tue canzoni preferite.</p>
    </div>
  );
}

export default WelcomePage;
