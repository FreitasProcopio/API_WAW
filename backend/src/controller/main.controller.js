import { PalavrasService }from "../service/main.service.js";
import { logEvents } from "../middlewares/logger.middlewares.js";


// ---------------------- # CRUD # ---------------------------------
export const criarPalavras = async (req, res) => {
  try {
    const { language, type, people, contexto } = req.body;

    logEvents ('Faltando credenciais', "criarPalavras.log")
    if (!language || !type || !people || !contexto) {
      return res
        .status(400)
        .json({ message: "Está faltando inserir as credenciais" });
    }

    const novasPalavras = await PalavrasService.criarPalavras(
      language,
      type,
      people,
      contexto
    );

    logEvents ('Criando nova palavra', "criarPalavras.log")
    res.status(201).json({
      message: "Palavras criadas com sucesso!",
      Word: novasPalavras,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const pegarPalavras = async (req, res) => {
  try {
    logEvents ("Capturamos tudo", "pegarPalavras.log")
    const palavras = await PalavrasService.carregarPalavras();
    res.json({ Word: palavras });
  } catch (error) {
    logEvents ("Error na Captura, consulte o controller", "pegarPalavras.log")
    res.status(500).json({ error: error.message });
  }
};

export const atualizarPalavras = async (req, res) => {
  try {
    const { id, ...novosDados } = req.body;

    if (!id) {
      return res.status(400).json({ error: "O parâmetro 'id' é obrigatório." });
    }

    const palavraAtualizada = await PalavrasService.atualizarPalavras(id, novosDados);

    logEvents("Palavra atualizada com sucesso", "atualizarPalavras.log");
    res.json({ message: "Palavra atualizada com sucesso.", palavra: palavraAtualizada });

  } catch (error) {
    logEvents("Erro ao atualizar palavra", "atualizarPalavras.log");
    res.status(500).json({ error: error.message });
  }
};

export const deletarPalavras = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "O parâmetro 'id' é obrigatório." });
    }

    const palavraRemovida = await PalavrasService.deletarPalavras(id);

    logEvents("Palavra removida", "deletarPalavras.log");
    res.json({ message: "Palavra deletada com sucesso.", palavra: palavraRemovida });
  } catch (error) {
    logEvents("Erro ao deletar palavra", "deletarPalavras.log");
    res.status(500).json({ error: error.message });
  }
};


// -------------------------- # BUSCAS # ----------------------------------
export const buscarPorTipo = async (req, res) => {
  try {
    const { type } = req.params;

    logEvents ("O parâmetro 'tipo' é obrigatório.", "buscar.log")
    if (!type) {
      return res
        .status(400)
        .json({ error: "O parâmetro 'tipo' é obrigatório." });
    }

    logEvents ("Encontramos algo apartir do seu tipo", "buscar.log")
    const typeFilter = await PalavrasService.buscarPorTipo(type);
    res.json(typeFilter);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const buscarPorLingua = async (req, res) => {
  try {
    const { language } = req.body;

    logEvents ("O parâmetro 'language' é obrigatório.", "buscar.log")
    if (!language) {
      return res
        .status(400)
        .json({ error: "O parâmetro 'language' é obrigatório." });
    }

    logEvents ("Encontramos sua língua", "buscar.log")
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
      return res
        .status(400)
        .json({ error: "O parâmetro 'povo' é obrigatório." });
    }

    logEvents ("Encontramos seu povo", "buscar.log")
    const peopleFilter = await PalavrasService.buscarPorPovo(people);
    res.json(peopleFilter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const buscarImagemPorLingua = async (req, res) => {
  try {
    const { language } = req.params;
    if (!language) {
      return res.status(400).json({ error: "O parâmetro 'language' é obrigatório." });
    }
    const imagemBuffer = await PalavrasService.buscarImagemPorLingua(language);
    if (!imagemBuffer) {
      logEvents('Imagem não encontrada para língua especifica', "visualizarImagem.log")
      return res.status(404).json({ message: "Imagem não encontrada para a língua especificada." });
    }
    logEvents('Sua imagem apareceu', "visualizarImagem.log")
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": imagemBuffer.length,
    });
    res.end(imagemBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



