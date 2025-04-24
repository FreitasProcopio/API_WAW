# 🌐 API de Tradução - Linguísticas

A **API de Tradução - Linguísticas** é uma API inovadora que possibilita a **criação de símbolos visuais únicos** e sua **associação a caracteres**, pontuações e outros símbolos. Ideal para quem deseja criar **alfabetos personalizados**, explorar **criptografia visual** e ampliar os horizontes da **comunicação gráfica e linguística**. ✨

---

## 🚀 Tecnologias Utilizadas

- 💻 **Frontend**: HTML, CSS, JavaScript  
- 🔧 **Backend**: JavaScript (Node.js), Python  
- 🗃️ **Banco de Dados**: Arquivos JSON (`db.json`, `symbols.json`)

---

## ⚙️ Funcionalidades

- ✍️ **Criar símbolos personalizados** e vinculá-los a caracteres.
- 👁️‍🗨️ **Visualizar os símbolos** criados a partir do caractere na URL.
- 🔍 **Filtrar símbolos** por tipo, língua ou povo.

---

## 📌 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/Dicio/povo` | Filtra os dados no `db.json` por povo |
| `GET` | `/Dicio/languages` | Filtra os dados no `db.json` por língua |
| `GET` | `/Dicio/tipos` | Filtra os dados no `db.json` por tipo |
| `GET` | `/Dicio/image/:char` | Busca a imagem relacionada ao caractere |
| `POST` | `/Dicio/criar` | Cria uma nova entrada com `languages`, `tipos`, `povos` |

---


### Clone o Repositório

```bash
git clone https://github.com/FreitasProcopio/API_WAW.git
```

### 1️⃣ Instalar Dependências

```bash
npm init -y          # Inicia o projeto Node
npm i nodemon        # Instala o Nodemon para hot-reload
npm i express        # Instala o framework Express
npm i uuid           # Instala a lib para gerar UUIDs
```

> 📌 **Python** também é necessário. Instale pelo site:  
> [Download Python](https://www.python.org/downloads/)

---

## 🧪 Como Rodar o Projeto Localmente

### 2️⃣ Rodar o Frontend (Python)

- Instale a extensão Python no seu editor:  
  [Extensão VSCode](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

- Execute o servidor Python:

```bash
python app.py
```

---

### 3️⃣ Rodar o Backend (Node.js)

Configure o `package.json` com:

```json
"main": "src/server.js",
"type": "module",
"scripts": {
  "dev": "nodemon src/server.js"
}
```

Execute o servidor:

```bash
npm run dev
```

---

### Para ver dados juntos, mesmo em dois ambientes :

### 1️⃣  Rode a sua page e preencha **TODOS** os dados
### 2️⃣  Entre em serve.js, copie a URL passada (http:// ...) 
### 3️⃣  Faça um POST para os dados pedidos com seu compilador de API ( Insomnia ou outros ) : { "id": "",  "languages": "...", "tipos": "...", "povo":"..." } 

⚠️ **Importante**: Certifique-se de que **ambos os servidores (Python e Node.js)** estão rodando simultaneamente, **caso queira rodar o Backend + FrontEnd**.

---

## 🤝 Contribuições

Fique à vontade para colaborar! Se tiver ideias, melhorias ou encontrar bugs:
- Crie um *Pull Request*
- Abra uma *Issue* para discussão 💬

---