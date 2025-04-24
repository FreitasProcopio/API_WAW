  import { Palavras } from "../model/main.model.js";
  import { v4 as uuidv4 } from "uuid"; // Importando a biblioteca uuid para gerar IDs únicos

  class PalavrasController { 

    // Carrega as palavras do arquivo JSON
    async pegarPalavras(req, res) { 
      await Palavras.carregarDoArquivo();
      res.json({ Word: Palavras.pegarPalavrasGuardadas() });
    }

    // Método para buscar palavras por tipo (/tipo)
    async buscarPorTipo(req, res) { 
      await Palavras.carregarDoArquivo();

      const { tipos } = req.body;
      if (!tipos) {
        return res.status(400).json({ error: "O parâmetro 'tipo' é obrigatório." });
      }

      const palavrasFiltradas = Palavras.buscarPorTipo(tipos);
      res.json(palavrasFiltradas);
    } 

    // Método para buscar palavras por língua (/language)
    async buscarPorLingua(req, res) {
      await Palavras.carregarDoArquivo();
      
      const { languages } = req.body;
      if (!languages) {
        return res.status(400).json({ error: "O parâmetro 'languages' é obrigatório." });
      }

      const languagesFilter = Palavras.buscarPorLingua(languages);
      res.json(languagesFilter);
    }

    // Método para buscar palavras por povo (/povo)
    async buscarPorPovo(req, res) {
      await Palavras.carregarDoArquivo();
      
      const { povo } = req.body;
      if (!povo) {
        return res.status(400).json({ error: "O parâmetro 'povo' é obrigatório." });
      }

      const povoFilter = Palavras.buscarPorPovo(povo);
      res.json(povoFilter);
    }

    // Método para gerar novas palavras (/criar)
    // Este método faz uma requisição para a API externa, obtém a imagem desenhada, contexto, caracter e o registra no arquivo JSON, logo após ser rodado a rota /criar, pelo usuário.
    async gerarPalavras(req, res) {
      const { languages, tipos, povo } = req.body;

      if (!languages || !tipos || !povo) {
          return res.status(400).json({ message: "Está faltando inserir as credenciais" });
      }

      try {
          // Fazendo a requisição para a API externa
          // Aqui você deve substituir pela URL correta da sua API externa
          const response = await fetch('http://127.0.0.1:5000/symbols', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
          });

          if (!response.ok) {
              return res.status(response.status).json({ message: "Erro ao acessar a API" });
          }
          const data = await response.json();

          if (!Array.isArray(data.symbols) || data.symbols.length === 0) {
            return res.status(500).json({ message: "Nenhum símbolo encontrado no JSON." });
        }

        const symbol = data.symbols[data.symbols.length - 1];
        if (!symbol || !symbol.image || !symbol.char || !symbol.contexto) {
            return res.status(500).json({ message: "Dados do símbolo estão incompletos." });
        }

          // Extraindo os dados do símbolo
          // Aqui você pode ajustar conforme a estrutura do JSON retornado pela sua API Externa
          const { image, char, contexto } = symbol;

          await Palavras.carregarDoArquivo();

          const novasPalavras = new Palavras(
              uuidv4(),
              image,
              povo,
              languages,
              contexto,
              tipos,
              char         
          );

          novasPalavras.registrar();
          await Palavras.salvarNoArquivo();

          res.status(201).json({ 
              message: "Palavras criadas com sucesso!", 
              Word: novasPalavras 
          });

      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erro ao criar palavras." });
      }
    }

    // Método para visualizar a imagem associada ao caractere
    async visualizarImagem(req, res) {
      const { char } = req.params;

      try {
          // Carregar os dados do arquivo JSON
          await Palavras.carregarDoArquivo();

          // Buscar a imagem associada ao caractere
          const imagem = Palavras.buscarImagem(char);

          if (!imagem) {
              return res.status(404).json({ message: "Imagem não encontrada para o caractere fornecido." });
          }

          // Decodificar a imagem base64 e enviá-la como resposta
          const imageBuffer = Buffer.from(imagem, "base64");
          res.writeHead(200, {
              "Content-Type": "image/png",
              "Content-Length": imageBuffer.length,
          });
          res.end(imageBuffer);
      } catch (error) {
          console.error("Erro ao visualizar imagem:", error);
          res.status(500).json({ message: "Erro ao visualizar imagem." });
      }
    } 
  }

  export default new PalavrasController();