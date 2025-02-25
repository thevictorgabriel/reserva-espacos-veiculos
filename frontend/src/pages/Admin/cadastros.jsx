import React from 'react';
import AdmHeader from "./adm-header";
import '../User/styles/home.css';
import Negar from '../../assets/negar.svg';
import Aceitar from '../../assets/aceitar.svg';

const Cadastros = () => {
    return (
        <div>
            <AdmHeader /> {/* ADM MENU */}
            <div className='main'>
                <section className="solicitacoes">
                    <h2>Solicitações de cadastro</h2>
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

export default Cadastros;