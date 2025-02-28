import React, { useState } from 'react';
import Header from "./header";
import './styles/home.css';
import api from "@/axios";
import { useNavigate } from "react-router-dom";

const Solicitacao = () => {
    const [tipo, setTipo] = useState("sala");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [mensagem, setMensagem] = useState(null);
    const navigate = useNavigate();

    const handleSolicitacao = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await api.post(
                "reservas/solicitar/",
                { tipo, descricao, data },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMensagem({ tipo: "sucesso", texto: "Solicitação enviada com sucesso!" });
            setDescricao("");
            setData("");
        } catch (error) {
            setMensagem({ tipo: "erro", texto: "Erro ao enviar solicitação. Tente novamente." });
            console.error("Erro na solicitação:", error);
        }
    };

    return (
        <div>
            <Header /> {/* MENU */}
            <div className='main'>
                <form className="form" onSubmit={handleSolicitacao}>
                    <div className="form-group">
                        <div className='form-item'>
                            <label>Motivo da reserva *</label>
                            <input 
                                type="text" 
                                value={descricao} 
                                onChange={(e) => setDescricao(e.target.value)} 
                                placeholder="Descreva aqui..." 
                            />
                        </div>
                        <label>
                            Sala
                            <input 
                                type="radio" 
                                name="tipo" 
                                value="sala" 
                                checked={tipo === "sala"} 
                                onChange={(e) => setTipo(e.target.value)} 
                            />
                        </label>
                        <label>
                            Veículo
                            <input 
                                type="radio" 
                                name="tipo" 
                                value="veiculo" 
                                checked={tipo === "veiculo"} 
                                onChange={(e) => setTipo(e.target.value)} 
                            />
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
                            <input 
                                type="date" 
                                value={data} 
                                onChange={(e) => setData(e.target.value)} 
                            />
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

                {mensagem && (
                    <div className={`message ${mensagem.tipo}`}>
                        {mensagem.texto}
                    </div>
                )}

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
