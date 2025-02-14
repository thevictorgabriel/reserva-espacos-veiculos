import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/User/login'; // Importe a página de login
import Cadastro from './pages/User/cadastro'; // Importe a página de cadastro

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Login />} /> {/* Rota padrão */}
      </Routes>
    </Router>
  );
}

export default App;