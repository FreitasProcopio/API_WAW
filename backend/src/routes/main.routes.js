import { Router } from "express"; // Importando o Router do express
import PalavrasController from "../controller/main.controller.js" // Importando o controlador de palavras

// Criando uma instância do Router, chamada de "palavras". Ela será usada para definir as rotas relacionadas a palavras.
const palavras = Router(); 
 

// Definindo as rotas e associando-as aos métodos do controlador de palavras

palavras.get("/Palavras", PalavrasController.pegarPalavras); // /Dicio/Palavras
palavras.get("/image/:char", PalavrasController.visualizarImagem); // /Dicio/image/:char (image/A || image/B)
palavras.post("/tipos", PalavrasController.buscarPorTipo); // /Dicio/tipo ("tipos":"adjetivo")
palavras.post("/languages", PalavrasController.buscarPorLingua); // /Dicio/language ("languages":"inglês")
palavras.post("/povo", PalavrasController.buscarPorPovo); // /Dicio/povo ("povo":"tupi")
palavras.post("/criar", PalavrasController.gerarPalavras); // /Dicio/criar


export default palavras;