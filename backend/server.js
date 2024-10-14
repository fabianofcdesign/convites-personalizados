const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

const dataFile = './data/aniversariantes.json';

// Função para salvar os dados no arquivo (se estiver usando arquivo JSON)
function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Função para ler os dados
function getData() {
  if (!fs.existsSync(dataFile)) return [];
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

// Rota para obter aniversariantes
app.get('/api/aniversariantes', (req, res) => {
  const aniversariantes = getData();
  res.json(aniversariantes);
});

// Rota para adicionar um novo aniversariante
app.post('/api/aniversariantes', (req, res) => {
  const { nome, data, dia, idade, endereco } = req.body;
  const aniversariantes = getData();
  const newAniversariante = {
    id: aniversariantes.length + 1,
    nome,
    data,
    dia,
    idade,
    endereco
  };
  aniversariantes.push(newAniversariante);
  saveData(aniversariantes);
  res.status(201).json(newAniversariante);
});

// Rota para editar um aniversariante
app.put('/api/aniversariantes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, data, dia, idade, endereco } = req.body;
  const aniversariantes = getData();
  const index = aniversariantes.findIndex((a) => a.id === parseInt(id));
  
  if (index !== -1) {
    aniversariantes[index] = { id: parseInt(id), nome, data, dia, idade, endereco };
    saveData(aniversariantes);
    res.json(aniversariantes[index]);
  } else {
    res.status(404).json({ error: 'Aniversariante não encontrado' });
  }
});

// Rota para excluir um aniversariante
app.delete('/api/aniversariantes/:id', (req, res) => {
  const { id } = req.params;
  const aniversariantes = getData();
  const newAniversariantes = aniversariantes.filter((a) => a.id !== parseInt(id));
  
  if (aniversariantes.length !== newAniversariantes.length) {
    saveData(newAniversariantes);
    res.status(200).json({ message: 'Aniversariante excluído com sucesso' });
  } else {
    res.status(404).json({ error: 'Aniversariante não encontrado' });
  }
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
