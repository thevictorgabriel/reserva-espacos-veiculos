import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/home.css';
import Logo from '../../assets/logoReservy.svg';

const Header = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Define como true se o token existir
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token JWT
    setIsAuthenticated(false);
    navigate("/login"); // Redireciona para a tela de login
  };

  return (
    <header className="header">
      <div className="logo-menu">
        <img src={Logo} alt="Logo" />
        <h1>Reservy</h1>
      </div>

      <nav className="nav-menu">
        <Link to={"/solicitacao"}>Solicitação</Link>
        <Link to={"/suasReservas"}>Suas Reservas</Link>
      </nav>

      <div className="perfil-menu">
        {isAuthenticated ? (
          <>
            <Link to={"/perfil"}>PERFIL</Link>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
