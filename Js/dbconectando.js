const { Pool} = require("pg");

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database: "registroUsuarios",
    password:"postgres",
    port:5432,
    max: 5,
    idleTimeoutMillis: 30000


   } )
   async function selecionaUsuario(){
    try{
        const responseDB = await pool.query("SELECT * FROM usuarios ")
        console.log("usuarios cadastrados",responseDB.rows)
    } catch (error){
        console.log("a consulta retornou" +error.mensage)
    }
   }
   async function cadastrarUsuario(){
    try{
        const responseDB = pool.query(`INSERT INTO usuarios (nome,idade,email,senha)VALUES ($1,$2,$3,$4`,[nome,idade,email,senha])
    }catch(error){
        console.log("a consulta retornou" +error.mensage)
    }
   }
selecionaUsuario()
cadastrarUsuario()
    