import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './styles/home.css';
import Logo from '../../assets/logoReservy.svg'

const Header = () => {
    return (
        <header className="header">
            <div className="logo-menu">
                <img src={Logo} />
                <h1>Reservy</h1>
            </div>

            <nav className="nav-menu">
                <Link to={"/solicitacao"}>Solicitação</Link>
                <Link to={"/solicitacao"}>Suas Reservas</Link>
                <Link to={"/solicitacao"}>Notificação</Link>
            </nav>

            <div className="perfil-menu">
                <Link to={"/perfil"}>PERFIL</Link>
            </div>
        </header>
    );
};

export default Header;