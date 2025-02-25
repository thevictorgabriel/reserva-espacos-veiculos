import React from 'react';
import AdmHeader from "./adm-header";
import '../User/styles/home.css';
import Lixeira from '../../assets/lixeira.svg'
import Editar from '../../assets/editar.svg';

const ListaPrevia = () => {
    return (
        <div>
            <AdmHeader /> {/* ADM MENU */}
            <div className='main'>
                <form className="form">

                    <div className="form-group">
                        <div className='form-item'>
                            <label>Data início *</label>
                            <input type="date" />
                        </div>

                        <div className='form-item'>
                            <label>Data final</label>
                            <input type="date" />
                        </div>
                    </div>

                    <button type="submit" className="btn-reservar">Adicionar Servidor</button>
                </form>
                <section className="solicitacoes">
                    <h2>Lista Prévia</h2>
                    <table>
                        <tr>
                            <th className='cabecalho'>Sala/Veículo</th>
                            <th className='cabecalho'>Duração</th>
                            <th className='cabecalho'>Solicitante</th>
                            <th className='cabecalho'>Avaliar</th>
                        </tr>
                        <tr>
                            <td>Picape S10 LTZ</td>
                            <td>29/02/2024 - 14:00 até 29/02/2024 - 18:00</td>
                            <td>Alternei Brito</td>
                            <td className='avaliar'>
                                <img src={Editar}/>
                                <img src={Lixeira}/>
                            </td>
                        </tr>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default ListaPrevia;