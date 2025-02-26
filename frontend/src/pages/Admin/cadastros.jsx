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
                            <th className='cabecalho'>Nome</th>
                            <th className='cabecalho'>CPF</th>
                            <th className='cabecalho'>SIAPE</th>
                            <th className='cabecalho'>Avaliar</th>
                        </tr>
                        <tr>
                            <td>Victor Gabriel Martins de Araujo</td>
                            <td>10210210220</td>
                            <td>123456789</td>
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