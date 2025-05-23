import PalavrasService from "../service/main.service.js";

export const pegarPalavras = async (req, res) => { 
  try {
    const palavras = await PalavrasService.carregarPalavras();
    res.json({ Word: palavras });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const buscarPorTipo = async (req, res) => { 
  try {
    const { type } = req.params;
    if (!type) {
      return res.status(400).json({ error: "O parâmetro 'tipo' é obrigatório." });
    }
    const typeFilter = await PalavrasService.buscarPorTipo(type);
    res.json(typeFilter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const buscarPorLingua = async (req, res) => {
  try {
    const { language } = req.body;
    if (!language) {
      return res.status(400).json({ error: "O parâmetro 'language' é obrigatório." });
    }

    const languageFilter = await PalavrasService.buscarPorLingua(language);
    res.json(languageFilter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const buscarPorPovo = async (req, res) => {
  try {
    const { people } = req.body;
    if (!people) {
      return res.status(400).json({ error: "O parâmetro 'povo' é obrigatório." });
    }

    const peopleFilter = await PalavrasService.buscarPorPovo(people);
    res.json(peopleFilter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const criarPalavras = async (req, res) => {
  try {
    const { language, type, people } = req.body;

    if (!language || !type || !people) {
      return res.status(400).json({ message: "Está faltando inserir as credenciais" });
    }

    const novasPalavras = await PalavrasService.criarPalavras(language, type, people);

    res.status(201).json({ 
      message: "Palavras criadas com sucesso!", 
      Word: novasPalavras 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const visualizarImagem = async (req, res) => {
  try {
    const { char } = req.params;
    const imagesWord = await PalavrasService.visualizarImagem(char);

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": imagesWord.length,
    });
    res.end(imagesWord);

  } catch (error) {
    console.error("Erro ao visualizar imagem:", error);
    if (error.message.includes("não encontrada")) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro ao visualizar imagem." });
    }
  }
};