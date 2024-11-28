async function criarConta() {
    const email = document.getElementById('email').value;
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const senha1 = document.getElementById('senha1').value;
    const senha2 = document.getElementById('senha2').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    const mensagem = document.getElementById('mensagem');

    if (senha1 !== senha2) {
        mensagem.textContent = 'As senhas não coincidem!';
        return;
    }


    const dadosUsuario = {
        email,
        nomeCompleto,
        senha: senha1,
        dataNascimento,
    };

    const { ok, resultado } = await criarUsuario(dadosUsuario);

    if (ok) {
        mensagem.style.color = 'green';
        mensagem.textContent = resultado.message;

        setTimeout(() => {
            const videoContainer = document.getElementById('video-container');
            const formContainer = document.getElementById('container-box2');
            const video = document.getElementById('confirmacao-video');

            formContainer.classList.add('hidden');
            videoContainer.style.display = 'block';
            video.play();

            video.onended = function () {
                window.location.href = '../screens/index.html';
            };
        }, 2000);
    } else {
        mensagem.style.color = 'red';
        mensagem.textContent = resultado.error;
    }
}
