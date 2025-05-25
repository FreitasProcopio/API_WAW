export class Palavras {
    #id;
    #language;
    #type;
    #contexto;
    #imagem;
    #caracter;
    #people;

    constructor(id, imagem, people, language, contexto, type, caracter) {
        this.#id = id;
        this.#imagem = imagem;
        this.#people = people;
        this.#language = language;
        this.#contexto = contexto;
        this.#type = type;
        this.#caracter = caracter;
    }

    toJSON() {
        return {
            Id: this.#id,
            Imagem: this.#imagem,
            people: this.#people,
            language: this.#language,
            contexto: this.#contexto,
            type: this.#type,
            caracter: this.#caracter
        };
    }
}