import { writeFile, readFile } from "fs/promises"; // Standard library in Node.js

export class Palavras {

    // Private attributes of the class
    #id;
    #language;
    #type;
    #contexto;
    #imagem;
    #caracter;
    #people;

    // Private static attribute for storing words
    static #guardar_palavras = []

    // Method to access the private static attribute
    get guardar_palavras() {
        return Palavras.#guardar_palavras;
    }

    // Class constructor and private attribute initializer
    constructor(id, imagem, people, language, contexto, type, caracter) {
        this.#id = id;
        this.#imagem = imagem;
        this.#people = people;
        this.#language = language;
        this.#contexto = contexto;
        this.#type = type;
        this.#caracter = caracter;
    }

    // Method to register a new word by adding it to the #guardar_palavras array
    registrar() {
        Palavras.#guardar_palavras.push({
            Id: this.#id,
            Imagem: this.#imagem,
            Nacao: this.#people,
            Lingua: this.#language,
            Contexto: this.#contexto,
            Tipo: this.#type,
            Caracter: this.#caracter
        });
    }
    
    // Static method to return all stored words
    static pegarPalavrasGuardadas() {
        return this.#guardar_palavras;
    }

    // Methods for searching for words by type
    static buscarPorTipo(type) {
        return this.#guardar_palavras.filter(p => p.Tipo === type);
    }

    // Methods for searching for words by language
    static buscarPorLingua(language) {
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return this.#guardar_palavras.filter( l => normalize(l.Lingua) === normalize(language) );
    }

    // Methods for searching for words by people
    static buscarPorPovo(people) {
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return this.#guardar_palavras.filter( p => normalize(p.Nacao) === normalize(people) );
    }

    // Methods for searching images
    static buscarImagem(char){

        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const palavra = this.#guardar_palavras.find(p => normalize(p.Caracter) === normalize(char));

        return palavra ? palavra.Imagem : null; 
    }

    // Method for loading dados in db.json
    static #caminhoArquivo = "./src/data/db.json";
    static async carregarDoArquivo() {
        try {
            const data = await readFile(this.#caminhoArquivo, "utf-8");
            const parsed = JSON.parse(data);
            
            if (!Array.isArray(parsed)) {
                throw new Error("Formato inválido do arquivo JSON");
            }
            
            Palavras.#guardar_palavras = parsed;
        } catch (erro) {
            console.error(`Erro ao carregar arquivo: ${erro.message}`);
            Palavras.#guardar_palavras = [];
        }
    }

    // Method for saving data in JSON file (./data/db.json)
    static async salvarNoArquivo() {
        try {
            const dados = JSON.stringify(Palavras.pegarPalavrasGuardadas(), null, 2);
            await writeFile("./src/data/db.json", dados, "utf-8");
        } catch (erro) {
            console.error("Falha ao salvar:", erro.message);
            throw erro; 
        }
    }
}