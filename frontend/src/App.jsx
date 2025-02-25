import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/User/login'; // Importe a página de login
import Cadastro from './pages/User/cadastro'; // Importe a página de cadastro
import Solicitacao from './pages/User/solicitacao';
import SuasReservas from './pages/User/suasReservas';
import Perfil from './pages/User/perfil';

import AdmSolicitacoes from './pages/Admin/adm-sollicitacoes';
import ListaPrevia from './pages/Admin/lista-previa';
import Cadastros from './pages/Admin/cadastros';
import AdmPerfil from './pages/Admin/adm-perfil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Login />} /> {/* Rota padrão */}
        <Route path="/solicitacao" element={<Solicitacao />} />
        <Route path="/suasReservas" element={<SuasReservas />} />
        <Route path="/perfil" element={<Perfil />} />

        <Route path="/adm-solicitacoes" element={<AdmSolicitacoes />} />
        <Route path="/lista-previa" element={<ListaPrevia />} />
        <Route path="/cadastros" element={<Cadastros />} />
        <Route path="/adm-perfil" element={<AdmPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;