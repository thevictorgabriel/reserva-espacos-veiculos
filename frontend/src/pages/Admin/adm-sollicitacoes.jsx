import React from 'react';
import AdmHeader from "./adm-header";
import '../User/styles/home.css';
import Negar from '../../assets/negar.svg';
import Aceitar from '../../assets/aceitar.svg';

const AdmSolicitacoes = () => {
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

                    <button type="submit" className="btn-reservar">Buscar</button>
                </form>
                <section className="solicitacoes">
                    <h2>Solicitações</h2>
                    <table>
                        <tr className='celula-titulo'>
                            <th colspan="4" className='celula-titulo'>
                                <p>Passeio a peixaria com a melhor equipe do curso de férias</p>
                            </th>

                        </tr>
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
                                <img src={Negar}/>
                                <img src={Aceitar}/>
                            </td>
                        </tr>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default AdmSolicitacoes;