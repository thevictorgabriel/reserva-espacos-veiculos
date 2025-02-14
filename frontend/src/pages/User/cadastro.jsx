import React from "react";
import { Link } from 'react-router-dom';
import "./styles/cadastro.css";

const Cadastro = () => {
  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h2>Cadastro</h2>
        <p className="login-link">
            Ainda não tem uma conta? <Link to="/login">Fazer login</Link>
          </p>
        <form className="registerForm">
          <div className="input-group">
            <div>
              <label>Nome *</label>
              <input type="text" placeholder="Digite seu nome" />
            </div>
          </div>
          <div className="input-group">
            <div>
              <label>SIAPE *</label>
              <input type="text" placeholder="Digite seu SIAPE" />
            </div>
            <div>
              <label>CPF *</label>
              <input type="text" placeholder="Digite seu CPF" />
            </div>
          </div>

          <div className="input-group">
            <div>
              <label>Email *</label>
              <input type="email" placeholder="Digite seu email" />
            </div>
            <div>
              <label>Telefone *</label>
              <input type="text" placeholder="Digite seu telefone" />
            </div>
          </div>

          <div className="input-group">
            <div>
              <label>Senha *</label>
              <input type="password" placeholder="Digite sua senha" />
            </div>
            <div>
              <label>Confirmar Senha *</label>
              <input type="password" placeholder="Confirme sua senha" />
            </div>
          </div>

          <button type="submit" className="btn-cadastrar">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
