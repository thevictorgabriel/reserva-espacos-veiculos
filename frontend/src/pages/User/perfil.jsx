import React, { useState, useEffect } from 'react';
import Header from "./header";
import { Link, useNavigate } from 'react-router-dom';
import './styles/home.css';
import api from "@/axios";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redireciona para login se não estiver autenticado
      return;
    }

    const fetchPerfil = async () => {
      try {
        const response = await api.get("perfil/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(response.data); // Salva os dados do usuário no estado
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        localStorage.removeItem("token"); // Remove token inválido
        navigate("/login"); // Redireciona para login
      }
    };

    fetchPerfil();
  }, [navigate]);

  if (!usuario) {
    return <p>Carregando perfil...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token JWT
    navigate("/login"); // Redireciona para a tela de login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await api.put("perfil/", usuario, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil.');
    }
  };

  return (
    <div>
      <Header /> {/* MENU */}
      <div className='main'>
        <section className="reservas">
          <div className='form-group'>
            <h1>Perfil</h1>
            <button className='logout' onClick={handleLogout}>LogOut</button>
          </div>

          <form className="registerForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <div>
                <label>Nome *</label>
                <input 
                  type="text" 
                  value={usuario.nome || ''} 
                  onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })} 
                  placeholder="Digite seu nome" 
                />
              </div>
            </div>

            <div className="input-group">
              <div>
                <label>Email *</label>
                <input 
                  type="email" 
                  value={usuario.email || ''} 
                  onChange={(e) => setUsuario({ ...usuario, email: e.target.value })} 
                  placeholder="Digite seu email" 
                />
              </div>
              <div>
                <label>Telefone *</label>
                <input 
                  type="text" 
                  value={usuario.telefone || ''} 
                  onChange={(e) => setUsuario({ ...usuario, telefone: e.target.value })} 
                  placeholder="Digite seu telefone" 
                />
              </div>
            </div>

            <div className="input-group">
              <div>
                <label>Senha *</label>
                <input 
                  type="password" 
                  value={usuario.senha || ''} 
                  onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })} 
                  placeholder="Digite sua senha" 
                />
              </div>
              <div>
                <label>Confirmar Senha *</label>
                <input 
                  type="password" 
                  value={usuario.confirmarSenha || ''} 
                  onChange={(e) => setUsuario({ ...usuario, confirmarSenha: e.target.value })} 
                  placeholder="Confirme sua senha" 
                />
              </div>
            </div>

            <div className="input-group">
              <button type="submit" className="btn-editar-perfil">
                Salvar Alterações
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Perfil;
