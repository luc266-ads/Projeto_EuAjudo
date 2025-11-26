const express = require('express');
const cors = require('cors');
const pool = require('./db'); // <-- conexão com NEON

const app = express();

app.use(cors());
app.use(express.json());

// -----------------------------
// USUÁRIOS
// -----------------------------

// GET - listar usuários
app.get("/api/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// POST - criar usuário
app.post("/api/usuarios", async (req, res) => {
  const { nome, email, senha, cpf } = req.body;

  if (!nome || !email || !senha || !cpf) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, cpf)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, email, senha, cpf]
    );
    res.json({ message: "Usuário cadastrado!", usuario: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
});

// DELETE - excluir usuário
app.delete("/api/usuarios/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [
      req.params.id,
    ]);
    res.json({ message: "Usuário deletado!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

// -----------------------------
// SUGESTÕES
// -----------------------------

app.get("/api/sugestoes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sugestoes ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar sugestões." });
  }
});

app.post("/api/sugestoes", async (req, res) => {
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

  try {
    const result = await pool.query(
      `INSERT INTO sugestoes 
      (sugestao, tipoSugestao, tipoPublico, tipoParentesco, objetivoSugestao)
      VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [sugestao, tipoSugestao, tipoPublico, tipoParentesco, objetivoSugestao]
    );
    res.json({ message: "Sugestão cadastrada!", sugestao: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar sugestão." });
  }
});

app.delete("/api/sugestoes/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM sugestoes WHERE id = $1", [req.params.id]);
    res.json({ message: "Sugestão deletada!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar sugestão." });
  }
});

// -----------------------------
// QUESTIONARIO
// -----------------------------

app.get("/api/questionario", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM questionario ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar questionarios." });
  }
});

app.post("/api/questionario", async (req, res) => {
  const { tipoLevel, tipoCor, tipoMensagem, tipoRecormendacao } = req.body;

  if (!tipoLevel || !tipoCor || !tipoMensagem || !tipoRecormendacao) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO questionario (tipoLevel, tipoCor, tipoMensagem, tipoRecormendacao)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [tipoLevel, tipoCor, tipoMensagem, tipoRecormendacao]
    );
    res.json({ message: "Questionário cadastrado!", questionario: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar questionário." });
  }
});

app.delete("/api/questionario/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM questionario WHERE id = $1", [
      req.params.id,
    ]);
    res.json({ message: "Questionário deletado!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar questionário." });
  }
});

// -----------------------------
// SERVIDOR
// -----------------------------

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api/usuarios`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api/sugestoes`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api/questionario`);

});