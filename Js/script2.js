async function logar() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha1').value;
    const mensagem = document.getElementById('mensagem') || document.createElement('p'); // Adicionar mensagem, se não existir
    

    try {
        //console.log(JSON.stringify({ email:email, senha:senha }))

        const response = await fetch("http://localhost:3000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:email, senha:senha }),
        });
        
        const data = await response.json()
        console.log(data)

        if (response.ok){
            console.log("Sucesso",data.message)
        }else{
            console.error("erro",data.message)
        }
        

    } catch (err) {
        mensagem.style.color = 'red';
        mensagem.textContent = 'Erro ao tentar logar. Tente novamente!';
        console.error('Erro ao logar:', err);
    }


// async function logar() {
//     const email = document.getElementById('email').value;
//     const senha = document.getElementById('senha1').value;
//     const mensagem = document.getElementById('mensagem') || document.createElement('p'); // Adicionar mensagem, se não existir
    
//     try {
//         const response = await fetch('http://localhost:3000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, senha }),
//         });

//         const resultado = await response.json();

//         if (response.ok) {
//             mensagem.style.color = 'green';
//             mensagem.textContent = resultado.message;

//             // Redireciona o usuário após login bem-sucedido
//             setTimeout(() => {
//                 window.location.href = 'inicio.html';
//             }, 1000);
//         } else {
//             mensagem.style.color = 'red';
//             mensagem.textContent = resultado.error;
//         }
//     } catch (err) {
//         mensagem.style.color = 'red';
//         mensagem.textContent = 'Erro ao tentar logar. Tente novamente!';
//         console.error('Erro ao logar:', err);
//     }

//     // Exibe a mensagem no DOM
//     const container = document.getElementById('container-box2');
//     if (!mensagem.parentNode) container.appendChild(mensagem);
// }






