import React from 'react';
import Header from "./header";
import './styles/home.css';
import Lixeira from '../../assets/lixeira.svg'

const SuasReservas = () => {
    return (
        <div>
            <Header /> {/* MENU */}
            <div className='main'>
                <section className="reservas">
                    <h2>Reservas</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Sala/Veículo</th>
                                <th>Duração</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Picape S10 LTZ</td>
                                <td>29/02/2024 - 14:00 até 29/02/2024 - 18:00</td>
                                <td><strong>Aprovada</strong></td>
                                <td><img src={Lixeira} /></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default SuasReservas;