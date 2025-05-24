import { writeFile, readFile } from "fs/promises";
import { Palavras } from "../model/main.model.js";
import { v4 as uuidv4 } from "uuid";

const caminhoArquivo = "./src/data/db.json";
let guardar_palavras = [];

export const PalavrasService = {

    async carregarDoArquivo() {
        try {
            const data = await readFile(caminhoArquivo, "utf-8");
            const parsed = JSON.parse(data);
            if (!Array.isArray(parsed)) throw new Error("Formato inválido do arquivo JSON");
            guardar_palavras = parsed;
        } catch (erro) {
            console.error(`Erro ao carregar arquivo: ${erro.message}`);
            guardar_palavras = [];
        }
    },

    async salvarNoArquivo() {
        try {
            const dados = JSON.stringify(guardar_palavras, null, 2);
            await writeFile(caminhoArquivo, dados, "utf-8");
        } catch (erro) {
            console.error("Falha ao salvar:", erro.message);
            throw erro;
        }
    },

    registrar(palavra) {
        guardar_palavras.push(palavra.toJSON());
    },

    carregarPalavras() {
        return guardar_palavras;
    },

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

        await this.carregarDoArquivo();

        const novasPalavras = new Palavras(
            uuidv4(),
            image,
            people,
            language,
            contexto,
            type,
            char
        );

        this.registrar(novasPalavras);
        await this.salvarNoArquivo();

        return novasPalavras;
    },



    // ----------------------------------- MÉTODOS DE BUSCAS ----------------------------------------------------
    buscarPorTipo(type) {
        return guardar_palavras.filter(p => p.Tipo === type);
    },

    buscarPorLingua(language) {
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return guardar_palavras.filter(l => normalize(l.Lingua) === normalize(language));
    },

    buscarPorPovo(people) {
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return guardar_palavras.filter(p => normalize(p.Nacao) === normalize(people));
    },

    async visualizarImagem(char, language) {
        await this.carregarDoArquivo();
        const imagens = this.buscarImagem(char, language);
        return imagens ? [Buffer.from(imagens, "base64")] : [];
    },
};