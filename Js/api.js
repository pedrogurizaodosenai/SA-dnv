/**
 * Função para criar um novo usuário no backend.
 * @param {Object} dadosUsuario 
 * @returns {Object} 
 */
async function criarUsuario(dadosUsuario) {
    try {
       
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosUsuario),
        });

        
        const resultado = await response.json();

        
        return {
            ok: response.ok,
            resultado,
        };
    } catch (err) {
   
        console.error('Erro ao conectar ao backend:', err);
        return {
            ok: false,
            resultado: { error: 'Erro ao conectar ao servidor!' },
        };
    }
}
