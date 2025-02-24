import React from 'react';
import Header from "./header";
import './styles/home.css';

const Solicitacao = () => {
    return (
        <div>
            <Header /> {/* MENU */}
            <div className='main'>
                <form className="form">
                    <div className="form-group">
                        <div className='form-item'>
                            <label>Motivo da reserva *</label>
                            <input type="text" placeholder="Descreva aqui..." />
                        </div>
                        <label>Sala
                            <input
                                type="radio"
                                name="tipo"
                                value="sala" />
                        </label>
                        <label>Veículo
                            <input
                                type="radio"
                                name="tipo"
                                value="veiculo" />
                        </label>
                    </div>

                    <div className='form-group'>
                        <div className='form-item'>
                            <label>Bloco</label>
                            <select>
                                <option>Selecione</option>
                            </select>
                        </div>
                        <div className='form-item'>
                            <label>Piso</label>
                            <select>
                                <option>Selecione</option>
                            </select>
                        </div>
                        <div className='form-item'>
                            <label>Sala/Veículo *</label>
                            <select>
                                <option>Selecione</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className='form-item'>
                            <label>Data início *</label>
                            <input type="date" />
                        </div>

                        <div className='form-item'>
                            <label>Data final</label>
                            <input type="date" />
                        </div>

                        <div className='form-item'>
                            <label>Hora começo *</label>
                            <input type="time" />
                        </div>

                        <div className='form-item'>
                            <label>Hora término *</label>
                            <input type="time" />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn-reservar">Reservar</button>
                </form>
                <section className="reservas">
                    <h2>Reservas</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Sala/Veículo</th>
                                <th>Duração</th>
                                <th>Solicitante</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Picape S10 LTZ</td>
                                <td>29/02/2024 - 14:00 até 29/02/2024 - 18:00</td>
                                <td>Alternei Brito</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default Solicitacao;