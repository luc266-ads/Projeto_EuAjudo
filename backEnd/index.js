const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // <-- ESSENCIAL para ler JSON no body

// 🔹 Simulando um "banco de dados"
let usuarios = [];
let sugestoes = [];
let questionario = [];

// --- Usuários ---
app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

app.post("/api/usuarios", (req, res) => {
  const { nome, email, senha, cpf } = req.body;

  if (!nome || !email || !senha || !cpf) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  const novoUsuario = { id: Date.now(), nome, email, senha, cpf };
  usuarios.push(novoUsuario);

  res.json({ message: "Usuário cadastrado com sucesso!", usuarios: novoUsuario });
});

app.delete("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex(u => u.id == id);
  if (index === -1) return res.status(404).json({ error: "Usuário não encontrado!" });
  usuarios.splice(index, 1);
  res.json({ message: "Usuário deletado com sucesso!" });
});


// --- Sugestões ---
app.get("/api/sugestoes", (req, res) => {
  res.json(sugestoes);
});

app.post("/api/sugestoes", (req, res) => {
  const {
    sugestao,
    tipoSugestao,        
    tipoPublico,
    tipoParentesco,
    objetivoSugestao,

  } = req.body;

  if (!sugestao || !tipoPublico || !tipoParentesco || !objetivoSugestao || !tipoSugestao) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  const novaSugestao = {
    id: Date.now(),
    sugestao,
    tipoSugestao,
    tipoPublico,
    tipoParentesco,
    objetivoSugestao,

  };

  sugestoes.push(novaSugestao);
  res.json({ message: "Sugestão cadastrada com sucesso!", sugestoes: novaSugestao });
});

app.delete("/api/sugestoes/:id", (req, res) => {
  const { id } = req.params;
  const index = sugestoes.findIndex(s => s.id == id);
  if (index === -1) return res.status(404).json({ error: "Sugestão não encontrada!" });
  sugestoes.splice(index, 1);
  res.json({ message: "Sugestão deletada com sucesso!" });
});


// --- Questionario ---

app.get("/api/questionario", (req, res) => {
  res.json(questionario);
});

app.post("/api/questionario", (req, res) => {
  const {
    tipoLevel,        
    tipoCor,
    tipoMensagem,
    tipoRecormendacao,

  } = req.body;

  if ( !tipoLevel || !tipoCor || !tipoMensagem || !tipoRecormendacao) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  const novoQuestionario = {
    id: Date.now(),
    tipoLevel,
    tipoCor,
    tipoMensagem,
    tipoRecormendacao,

  };

  questionario.push(novoQuestionario);
  res.json({ message: "Questionario cadastrada com sucesso!", questionario: novoQuestionario });
});

app.delete("/api/questionario/:id", (req, res) => {
  const { id } = req.params;
  const index = questionario.findIndex(s => s.id == id);
  if (index === -1) return res.status(404).json({ error: "Questionario não encontrada!" });
  questionario.splice(index, 1);
  res.json({ message: "Questionario deletada com sucesso!" });
});




// 🔹 Servidor online
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api/usuarios`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api/sugestoes`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api/questionario`);
});
