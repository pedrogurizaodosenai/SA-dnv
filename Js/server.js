const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json())

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'SA', 
  password: 'postgres', 
  port: 5432, 
});


// Código Login -> Pegar no DB, verificar e enviar
app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(404).send({message:"falha login",success:false});
    }
    const user = result.rows[0];
    if (!(senha===user.senha)) {
      return res.status(401).send({message:"sucesso login",success:true});
    }
  } catch (error) {
    console.error("Erro ao fazer login: ", error.message);
    res.status(500).send({message:"falha login",sucess:false});
  }
});
//




pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco bem-sucedida:', res.rows[0]);
  }
});


app.use(cors());
app.use(bodyParser.json());


app.post('/api/usuarios', async (req, res) => {
  const { email, nomeCompleto, senha, dataNascimento } = req.body;

  console.log('Recebendo dados:', req.body); 

  if (!email || !nomeCompleto || !senha || !dataNascimento) {
    console.log('Campos ausentes!');
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    const query = `
      INSERT INTO usuarios (email, nome_completo, senha, data_nascimento)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [email, nomeCompleto, senha, dataNascimento];
    console.log('Executando query com valores:', values); 

    const result = await pool.query(query, values);

    console.log('Usuário criado:', result.rows[0]); 
    res.status(201).json({ message: 'Conta criada com sucesso!', user: result.rows[0] });
  } catch (err) {
    console.error('Erro ao criar usuário:', err); 
    res.status(500).json({ error: 'Erro ao criar conta!' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
