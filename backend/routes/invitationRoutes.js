const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');

router.post('/api/invitations', (req, res) => {
  const { name, date, time, location, day } = req.body;

  const newInvitation = new Invitation({
    name,
    date,
    time,
    location,
    day,  // Incluindo o campo "Dia"
  });

  newInvitation.save()
    .then(invitation => {
      res.status(201).json(invitation);
    })
    .catch(err => {
      res.status(400).json({ message: "Erro ao salvar o convite", error: err });
    });
});

module.exports = router;
