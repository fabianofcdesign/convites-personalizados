const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  day: { type: String, required: true }, // Campo "Dia"
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
