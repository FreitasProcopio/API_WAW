import { Router } from "express"; 
import {
  pegarPalavras,
  buscarPorTipo,
  buscarPorLingua,
  buscarPorPovo,
  criarPalavras,
  buscarImagemPorLingua,
  atualizarPalavras,
  deletarPalavras
} from '../controller/main.controller.js';

const router = Router(); 

router.post("/create", criarPalavras); // /create
router.get("/all", pegarPalavras); // /palavras
router.put("/update", atualizarPalavras); // /update
router.delete("/delete", deletarPalavras); // /delete

router.get("/image/:language", buscarImagemPorLingua); // /image/:language (image/pt || image/en)
router.get("/type/:type", buscarPorTipo); // /type ("type":"adjetivo")

router.post("/language", buscarPorLingua); // /language ("language":"inglês")
router.post("/people", buscarPorPovo); // /people ("people":"tupi")



export default router;