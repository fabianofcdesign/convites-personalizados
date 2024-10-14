import React, { useState } from 'react';

const HomePage = () => {
  const [invitation, setInvitation] = useState({
    theme: '',
    name: '',
    date: '',
    time: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvitation({ ...invitation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/invitations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invitation)
    });

    if (response.ok) {
      alert('Convite criado com sucesso!');
    } else {
      alert('Erro ao criar convite');
    }
  };

  return (
    <div>
      <h1>Crie seu convite</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={invitation.name} onChange={handleInputChange} placeholder="Nome do Aniversariante" required />
        <input type="text" name="date" value={invitation.date} onChange={handleInputChange} placeholder="Data" required />
        <input type="text" name="time" value={invitation.time} onChange={handleInputChange} placeholder="Horário" required />
        <input type="text" name="location" value={invitation.location} onChange={handleInputChange} placeholder="Local" required />
        <button type="submit">Gerar Convite</button>
      </form>
    </div>
  );
};

export default HomePage;
