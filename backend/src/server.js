import express from "express"; // Importando o express
import Dicio from "./routes/main.routes.js"; // Importando as rotas de palavras

const app = express(); // Criando uma instância do express
const PORT = 3000; // Definindo a porta do servidor


// URL da aplicação, quando inicializada -> http://localhost:3000/Dicio/


app.use(express.json()); // Middleware para analisar o corpo das requisições como JSON

app.use("/Dicio", Dicio); // Usando as rotas de palavras

app.listen(PORT, () => {
  console.log(`Rodando o Servidor na porta ${PORT}`);
}); // Iniciando o servidor e retornando a mensagem de sucesso da porta definida 