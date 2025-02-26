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
                            <label>Nome *</label>
                            <input type="text" />
                        </div>

                        <div className='form-item'>
                            <label>CPF *</label>
                            <input type="text" />
                        </div>

                        <div className='form-item'>
                            <label>SIAPE *</label>
                            <input type="text" />
                        </div>
                    </div>

                    <button type="submit" className="btn-reservar">Adicionar Servidor</button>
                </form>
                <section className="solicitacoes">
                    <h2>Lista Prévia</h2>
                    <table>
                        <tr>
                            <th className='cabecalho'>Nome</th>
                            <th className='cabecalho'>CPF</th>
                            <th className='cabecalho'>SIAPE</th>
                            <th className='cabecalho'>Ações</th>
                        </tr>
                        <tr>
                            <td>Victor Gabriel Martins de Araujo</td>
                            <td>10210210220</td>
                            <td>123456789</td>
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