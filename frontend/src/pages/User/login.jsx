import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/login.css';
import Logo from '../../assets/logoReservy.svg';
import api from "@/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetando o erro

    try {
      const response = await api.post("login/", { email, password });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.access); // Armazena o token
        navigate("/perfil"); // Redireciona para a página de perfil
      }
    } catch (err) {
      setError("Credenciais inválidas ou usuário não aprovado.");
    }
  };

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
        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Digite seu email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <label>Senha</label>
          <input 
            type="password" 
            placeholder="Digite sua senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          {error && <p className="error-message">{error}</p>}

          <div className="login-options">
            <a href="#" className="forgot-password">
              Esqueceu a senha?
            </a>
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

          <p className="register-link">
            Ainda não tem uma conta? <Link to="/cadastro">Criar conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
