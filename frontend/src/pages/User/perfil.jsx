import React from 'react';
import Header from "./header";
import { Link } from 'react-router-dom';
import './styles/home.css';

const Perfil = () => {
    return (
        <div>
            <Header /> {/* MENU */}
            <div className='main'>
                <section className="reservas">
                    <div className='form-group'>
                        <h1>Perfil</h1>
                        <Link className='logout' to={'/login'}>LogOut</Link>
                    </div>

                    <form className="registerForm">
                        <div className="input-group">
                            <div>
                                <label>Nome *</label>
                                <input type="text" placeholder="Digite seu nome" />
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

                        <div className="input-group">

                            <button type="submit" className="btn-editar-perfil">
                                Salvar Alterações
                            </button>

                            <a className='delete-perfil' href="">Salvar Modificacções</a>

                        </div>

                    </form>
                </section>
            </div>
        </div>
    );
};

export default Perfil;