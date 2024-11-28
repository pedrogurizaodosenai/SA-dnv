async function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    if (!email || !senha) {
        mensagem.textContent = 'Preencha todos os campos!';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            mensagem.style.color = 'green';
            mensagem.textContent = data.message;
            setTimeout(() => {
                window.location.href = 'inicio.html'; // Redireciona após login bem-sucedido
            }, 2000);
        } else {
            mensagem.style.color = 'red';
            mensagem.textContent = data.error;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        mensagem.style.color = 'red';
        mensagem.textContent = 'Erro no servidor. Tente novamente mais tarde!';
    }
}
