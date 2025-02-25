import React from 'react';
import { Link } from 'react-router-dom';
import './styles/login.css';
import Logo from '../../assets/logoReservy.svg';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <h1>Reservy</h1>
        </div>
        <p>Sistema Web de gerenciamento de reservas para salas e veículos</p>
        <br />
        <p>O jeito mais fácil de reservar salas e veículos</p>
        <br />
        <p>Reserve de qualquer lugar ou dispositivo</p>
        <br />
        <p>Receba notificações e acompanhe suas solicitações de reservas</p>
      </div>

      <div className="login-right">
        <h2>Login</h2>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Digite seu email" required />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" required />

          <div className="login-options">
            <a href="#" className="forgot-password">
              Esqueceu a senha?
            </a>
          </div>
          <Link to={"/adm-solicitacoes"}>
            <button type="submit" className="login-button">
              Entrar
            </button>
          </Link>

          <p className="register-link">
            Ainda não tem uma conta? <Link to="/cadastro">Criar conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;