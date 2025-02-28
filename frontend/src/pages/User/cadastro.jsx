import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./styles/cadastro.css";
import api from "@/axios";

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    siape: '',
    email: '',
    senha: '',
    telefone: '',
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    
    try {
      // Envia os dados do CPF e SIAPE para verificar se estão na lista prévia
      const response = await api.post('/cadastro/', formData);

      // Verifica se a resposta indica que o cadastro está pendente
      if (response.data.status === 'pendente') {
        // Exibe um alerta informando que o cadastro está pendente de aprovação
        alert('Solicitação de cadastro feita, espere até receber confirmação do administrador');
      } else {
        // Caso o cadastro seja bem-sucedido, exibe a mensagem da resposta
        setMensagem(response.data.message);
        
        // Redireciona para a página de login ou outra página conforme necessário
        navigate('/login');
      }
    } catch (error) {
      setMensagem(error.response?.data?.message || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h2>Cadastro</h2>
        <p className="login-link">
          Ainda não tem uma conta? <Link to="/login">Fazer login</Link>
        </p>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <div>
              <label>Nome *</label>
              <input 
                type="text" 
                name="nome" 
                placeholder="Digite seu nome" 
                value={formData.nome} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <div className="input-group">
            <div>
              <label>SIAPE *</label>
              <input 
                type="text" 
                name="siape" 
                placeholder="Digite seu SIAPE" 
                value={formData.siape} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>CPF *</label>
              <input 
                type="text" 
                name="cpf" 
                placeholder="Digite seu CPF" 
                value={formData.cpf} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="input-group">
            <div>
              <label>Email *</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Digite seu email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Telefone *</label>
              <input 
                type="text" 
                name="telefone" 
                placeholder="Digite seu telefone" 
                value={formData.telefone} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="input-group">
            <div>
              <label>Senha *</label>
              <input 
                type="password" 
                name="senha" 
                placeholder="Digite sua senha" 
                value={formData.senha} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Confirmar Senha *</label>
              <input 
                type="password" 
                name="confirmarSenha" 
                placeholder="Confirme sua senha" 
                value={formData.confirmarSenha} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <button type="submit" className="btn-cadastrar">
            Cadastrar
          </button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
};

export default Cadastro;
