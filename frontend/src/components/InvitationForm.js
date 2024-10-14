import React, { useState } from 'react';
import axios from 'axios';

const InvitationForm = ({ onNewAniversariante }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [dia, setDia] = useState('');
  const [idade, setIdade] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const diaDaSemana = new Date(data).toLocaleDateString('pt-BR', { weekday: 'long' });
    setDia(diaDaSemana);

    const newAniversariante = { nome, data, dia: diaDaSemana, idade, endereco };
    
    axios
      .post('http://localhost:5000/api/aniversariantes', newAniversariante)
      .then((response) => {
        onNewAniversariante(response.data);
        setNome('');
        setData('');
        setIdade('');
        setEndereco('');
      })
      .catch((error) => console.error('Erro ao cadastrar:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default InvitationForm;
