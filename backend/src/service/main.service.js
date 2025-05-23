import { Palavras } from "../model/main.model.js";
import { v4 as uuidv4 } from "uuid";

class PalavrasService {

  async carregarPalavras() {
    await Palavras.carregarDoArquivo();
    return Palavras.pegarPalavrasGuardadas();
  }

  async buscarPorTipo(type) {
    await Palavras.carregarDoArquivo();
    return Palavras.buscarPorTipo(type);
  }

  async buscarPorLingua(language) {
    await Palavras.carregarDoArquivo();
    return Palavras.buscarPorLingua(language);
  }

  async buscarPorPovo(people) {
    await Palavras.carregarDoArquivo();
    return Palavras.buscarPorPovo(people);
  }

  async criarPalavras(language, type, people) {
    const response = await fetch('http://127.0.0.1:5000/symbols', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error("Erro ao acessar a API");
    }

    const data = await response.json();

    if (!Array.isArray(data.symbols) || data.symbols.length === 0) {
      throw new Error("Nenhum símbolo encontrado no JSON.");
    }

    const symbol = data.symbols[data.symbols.length - 1];
    if (!symbol || !symbol.image || !symbol.char || !symbol.contexto) {
      throw new Error("Dados do símbolo estão incompletos.");
    }

    const { image, char, contexto } = symbol;

    await Palavras.carregarDoArquivo();

    const novasPalavras = new Palavras(
      uuidv4(),
      image,
      people,
      language,
      contexto,
      type,
      char         
    );

    novasPalavras.registrar();
    await Palavras.salvarNoArquivo();

    return novasPalavras;
  }

  async visualizarImagem(char) {

    await Palavras.carregarDoArquivo();
    const imagem = Palavras.buscarImagem(char);
    return Buffer.from(imagem, "base64");
  }
}

export default new PalavrasService();