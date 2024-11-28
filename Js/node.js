// Rota para verificar login
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
    }

    try {
        const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
        const values = [email, senha];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            // Usuário encontrado
            res.status(200).json({ message: 'Login bem-sucedido!' });
        } else {
            // Usuário não encontrado
            res.status(401).json({ error: 'E-mail ou senha incorretos!' });
        }
    } catch (err) {
        console.error('Erro ao verificar login:', err);
        res.status(500).json({ error: 'Erro ao verificar login!' });
    }
});
