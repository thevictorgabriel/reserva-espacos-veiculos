import React, { useState, useEffect } from 'react';
import Header from "./header";
import './styles/home.css';
import Lixeira from '../../assets/lixeira.svg';
import api from "@/axios";
import { useNavigate } from "react-router-dom";

const SuasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mensagem, setMensagem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("reservas/minhas/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        setMensagem({ tipo: "erro", texto: "Erro ao carregar suas reservas." });
      }
    };

    fetchReservas();
  }, [navigate]);

  const handleCancelar = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await api.delete(`reservas/${id}/cancelar/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservas(reservas.filter((reserva) => reserva.id !== id));
      setMensagem({ tipo: "sucesso", texto: "Reserva cancelada com sucesso!" });
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      setMensagem({ tipo: "erro", texto: "Erro ao cancelar a reserva." });
    }
  };

  return (
    <div>
      <Header /> {/* MENU */}
      <div className='main'>
        <section className="reservas">
          <h2>Reservas</h2>
          {mensagem && (
            <div className={`message ${mensagem.tipo}`}>
              {mensagem.texto}
            </div>
          )}
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
              {reservas.length > 0 ? (
                reservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.salaOuVeiculo}</td>
                    <td>{`${reserva.dataInicio} - ${reserva.dataFim}`}</td>
                    <td><strong>{reserva.status}</strong></td>
                    <td>
                      <img 
                        src={Lixeira} 
                        alt="Cancelar reserva"
                        onClick={() => handleCancelar(reserva.id)} 
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Você não tem reservas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default SuasReservas;
