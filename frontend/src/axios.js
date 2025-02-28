// src/axios.js

import axios from 'axios';

// Criando uma instância do Axios com baseURL configurado
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Substitua pelo seu servidor backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionando o token no cabeçalho da requisição automaticamente
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Pegando o token do localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Adicionando o token no cabeçalho
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default api;