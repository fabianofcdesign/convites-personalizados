import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvitationForm from '../components/InvitationForm';
import './styles/InvitationList.css';

const InvitationList = () => {
  const [aniversariantes, setAniversariantes] = useState([]);

  // Carregar os aniversariantes cadastrados
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/aniversariantes')
      .then((response) => {
        setAniversariantes(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar aniversariantes:', error);
      });
  }, []);

  // Deletar um aniversariante
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/aniversariantes/${id}`)
      .then(() => {
        setAniversariantes(aniversariantes.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Erro ao excluir:', error));
  };

  // Editar um aniversariante
  const handleEdit = (id, updatedData) => {
    axios
      .put(`http://localhost:5000/api/aniversariantes/${id}`, updatedData)
      .then((response) => {
        const updatedAniversariantes = aniversariantes.map((item) =>
          item.id === id ? response.data : item
        );
        setAniversariantes(updatedAniversariantes);
      })
      .catch((error) => console.error('Erro ao editar:', error));
  };

  return (
    <div>
      <h1>Cadastro de Aniversariantes</h1>
      <InvitationForm onNewAniversariante={(data) => setAniversariantes([...aniversariantes, data])} />
      
      {/* Tabela de aniversariantes */}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data da Festa</th>
            <th>Dia</th>
            <th>Idade</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aniversariantes.length === 0 ? (
            <tr>
              <td colSpan="6">Nenhum aniversariante cadastrado.</td>
            </tr>
          ) : (
            aniversariantes.map((aniversariante) => (
              <tr key={aniversariante.id}>
                <td>
                  <input
                    type="text"
                    value={aniversariante.nome}
                    onChange={(e) =>
                      handleEdit(aniversariante.id, {
                        ...aniversariante,
                        nome: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={aniversariante.data}
                    onChange={(e) =>
                      handleEdit(aniversariante.id, {
                        ...aniversariante,
                        data: e.target.value,
                        dia: new Date(e.target.value).toLocaleDateString('pt-BR', { weekday: 'long' }),
                      })
                    }
                  />
                </td>
                <td>{aniversariante.dia}</td>
                <td>
                  <input
                    type="number"
                    value={aniversariante.idade}
                    onChange={(e) =>
                      handleEdit(aniversariante.id, {
                        ...aniversariante,
                        idade: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={aniversariante.endereco}
                    onChange={(e) =>
                      handleEdit(aniversariante.id, {
                        ...aniversariante,
                        endereco: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button onClick={() => handleDelete(aniversariante.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvitationList;
