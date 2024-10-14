const express = require('express');
const router = express.Router();

// Dados fictícios (substitua com banco de dados se necessário)
let aniversariantes = [
  { id: 1, nome: "João", data: "2024-10-14", dia: "Segunda-feira", horario: "18:00", local: "Salão de Festas" },
  { id: 2, nome: "Maria", data: "2024-11-22", dia: "Sexta-feira", horario: "20:00", local: "Casa" }
];

// Rota para listar todos os aniversariantes
router.get('/', (req, res) => {
  res.json(aniversariantes);
});

// Adicionar novo aniversariante
router.post('/', (req, res) => {
  const { nome, data, dia, horario, local } = req.body;
  const novoAniversariante = {
    id: aniversariantes.length + 1, // ID incremental
    nome,
    data,
    dia,
    horario,
    local
  };
  aniversariantes.push(novoAniversariante);
  res.json(novoAniversariante);
});

// Rota para editar aniversariante
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, data, dia, horario, local } = req.body;

  const aniversarianteIndex = aniversariantes.findIndex(a => a.id === parseInt(id));
  if (aniversarianteIndex !== -1) {
    aniversariantes[aniversarianteIndex] = { id: parseInt(id), nome, data, dia, horario, local };
    res.json(aniversariantes[aniversarianteIndex]);
  } else {
    res.status(404).json({ message: 'Aniversariante não encontrado' });
  }
});

// Rota para excluir aniversariante
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  aniversariantes = aniversariantes.filter(a => a.id !== parseInt(id));
  res.json({ message: 'Aniversariante excluído com sucesso' });
});

module.exports = router;
