import { Palavras } from "../model/main.model.js";
import { writeFile, readFile } from "fs/promises";
import { normalize } from "path";
import { v4 as uuidv4 } from "uuid";
import { atualizarPalavras, deletarPalavras } from "../controller/main.controller.js";

const caminhoArquivo = "./src/data/db.json";
let guardar_palavras = [];

export const PalavrasService = {

    async criarPalavras(language, type, people, contexto) {

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
            if (!symbol || !symbol.image || !symbol.char ) {
                throw new Error("Dados do símbolo estão incompletos.");
            }

            const { image, char } = symbol;

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

    async carregarPalavras() {
        try {
            const data = await readFile(caminhoArquivo, "utf-8");
            const parsed = JSON.parse(data);
            if (!Array.isArray(parsed)) throw new Error("Formato inválido do arquivo JSON");
            return parsed;
        } catch (erro) {
            console.error(`Erro ao carregar arquivo: ${erro.message}`);
            return [];
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

    async atualizarPalavras(id, novosDados) { 
        const data = await readFile(caminhoArquivo, "utf-8");
        const palavras = JSON.parse(data);
        if (!Array.isArray(palavras)) throw new Error("Formato inválido do arquivo JSON");

        // Procura pelo campo Id (maiúsculo)
        const index = palavras.findIndex(p => p.Id === id);
        if (index === -1) {
            throw new Error("Palavra não encontrada.");
        }
        palavras[index] = { ...palavras[index], ...novosDados };

        await writeFile(caminhoArquivo, JSON.stringify(palavras, null, 2), "utf-8");
        return palavras[index];
    },
    
    async deletarPalavras(id) {
        const data = await readFile(caminhoArquivo, "utf-8");
        const palavras = JSON.parse(data);
        if (!Array.isArray(palavras)) throw new Error("Formato inválido do arquivo JSON");

        const index = palavras.findIndex(p => p.Id === id);
        if (index === -1) {
            throw new Error("Palavra não encontrada.");
        }
        const palavraRemovida = palavras.splice(index, 1)[0];

        await writeFile(caminhoArquivo, JSON.stringify(palavras, null, 2), "utf-8");
        return palavraRemovida;
    },

    registrar(palavra) {
        guardar_palavras.push(palavra.toJSON());
    },


    // ----------------------------------- MÉTODOS DE BUSCAS ----------------------------------------------------

    
    async buscarPorTipo(type) {
        const tipo = await this.carregarPalavras();
        return tipo.filter(p => p.Tipo === type);
    },
    
    async buscarPorLingua(language) {
        const lingua = await this.carregarPalavras();
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return lingua.filter(l => normalize(l.Lingua) === normalize(language));
    },
    
    async buscarPorPovo(people) {
        const pessoas = await this.carregarPalavras();
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return pessoas.filter(p => normalize(p.Nacao) === normalize(people));
    },

    async buscarImagemPorLingua(language) {
        const palavras = await this.carregarPalavras();
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const palavra = palavras.find(l => normalize(l.Lingua) === normalize(language));
        if (!palavra || !palavra.Imagem) {
            return null;
        }
        // Retorna o buffer da imagem em PNG
        return Buffer.from(palavra.Imagem, 'base64');
    }
};