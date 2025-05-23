import { Router } from "express"; 
import {
  pegarPalavras,
  buscarPorTipo,
  buscarPorLingua,
  buscarPorPovo,
  criarPalavras,
  visualizarImagem
} from '../controller/main.controller.js';

const router = Router(); 

router.get("/", pegarPalavras); // /palavras
router.get("/image/:char", visualizarImagem); // /image/:char (image/A || image/B)
router.get("/type/:type", buscarPorTipo); // /type ("type":"adjetivo")


router.post("/language", buscarPorLingua); // /language ("language":"inglês")
router.post("/people", buscarPorPovo); // /people ("people":"tupi")
router.post("/create", criarPalavras); // /create

export default router;