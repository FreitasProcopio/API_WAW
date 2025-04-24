// Importando o módulo fs/promises para manipulação de arquivos
// Não precisa ser instalado, pois já vem com o Node.js
import { writeFile, readFile } from "fs/promises"; 


export class Palavras {

    // Atributos privados da classe
    #id;
    #languages;
    #tipos;
    #contexto;
    #imagem;
    #caracter;
    #povo;

    // Atributo estático privado para armazenar as palavras
    static #guardar_palavras = []

    // Método getter para acessar o atributo estático privado
    get guardar_palavras() {
        return Palavras.#guardar_palavras;
    }

    // Construtor da classe inicializa os atributos privados
    constructor(id,imagem, povo, languages, contexto, tipos, caracter) {
        this.#id = id;
        this.#imagem = imagem;
        this.#povo = povo;
        this.#languages = languages;
        this.#contexto = contexto;
        this.#tipos = tipos;
        this.#caracter = caracter;
    }

    // Método para registrar uma nova palavra adicionando ao array #guardar_palavras
    registrar() {
        Palavras.#guardar_palavras.push({
            Id: this.#id,
            Imagem: this.#imagem,
            Nacao: this.#povo,
            Lingua: this.#languages,
            Contexto: this.#contexto,
            Tipo: this.#tipos,
            Caracter: this.#caracter
        });
    }
    
    // Método para retornar todas as palavras guardadas
    static pegarPalavrasGuardadas() {
        return this.#guardar_palavras;
    }

    // Métodos para buscar palavras por tipo
    static buscarPorTipo(tipo) {
        return this.#guardar_palavras.filter(p => p.Tipo === tipo);
    }

    // Métodos para buscar palavras por língua
    static buscarPorLingua(languages) {
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return this.#guardar_palavras.filter( l => normalize(l.Lingua) === normalize(languages) );
    }

    // Métodos para buscar palavras por povo
    static buscarPorPovo(povo) {
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return this.#guardar_palavras.filter( p => normalize(p.Nacao) === normalize(povo) );
    }

    static buscarImagem(char){
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const palavra = this.#guardar_palavras.find(p => normalize(p.Caracter) === normalize(char));
        return palavra ? palavra.Imagem : null; // Retorna a imagem ou null se não encontrar
    }
    // Método para ler os dados no arquivo JSON e carregar no array #guardar_palavras
    // Usado para carregar os dados que podem existir no arquivo db.json ( ./data/db.json )
    static async carregarDoArquivo() {
        try {
          const data = await readFile("./src/data/db.json", "utf-8");
          Palavras.#guardar_palavras = JSON.parse(data);
        } catch (erro) {
          Palavras.#guardar_palavras = [];
        }
      }

    // Método para salvar os dados no arquivo JSON (./data/db.json)
    static async salvarNoArquivo() {
        await writeFile(
            "./src/data/db.json",
            JSON.stringify(Palavras.pegarPalavrasGuardadas(), null, 2),
            "utf-8"
        );
    }
}