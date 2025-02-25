import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './styles/adm.css';
import Logo from '../../assets/logoReservy.svg'

const AdmHeader = () => {
    return (
        <header className="header">
            <div className="logo-menu">
                <img src={Logo} />
                <h2>ADM</h2>
                <h1>Reservy</h1>
            </div>

            <nav className="nav-menu">
                <Link to={"/adm-solicitacoes"}>Solicitações</Link>
                <Link to={"/lista-previa"}>Lista Prévia</Link>
                <Link to={"/cadastros"}>Cadastro</Link>
            </nav>

            <div className="perfil-menu">
                <Link to={"/adm-perfil"}>PERFIL</Link>
            </div>
        </header>
    );
};

export default AdmHeader;