const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation'); // Importa o modelo de dados

// Rota para cadastrar um novo convite
router.post('/api/invitations', (req, res) => {
  console.log("Dados recebidos:", req.body); // Log para verificar os dados

  const { name, date, time, location, day } = req.body;

  if (!name || !date || !time || !location || !day) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  // Criação de um novo objeto Invitation com os dados do formulário
  const newInvitation = new Invitation({
    name,
    date,
    time,
    location,
    day,  // Incluindo o campo "Dia"
  });

  // Salvar no banco de dados
  newInvitation.save()
    .then(invitation => {
      console.log("Convite salvo:", invitation); // Log para ver o que foi salvo
      res.status(201).json(invitation); // Retorna o convite salvo
    })
    .catch(err => {
      console.error("Erro ao salvar convite:", err); // Log de erro
      res.status(500).json({ message: "Erro ao salvar o convite", error: err });
    });
});

module.exports = router;
