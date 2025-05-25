# 🌐 API de Tradução - Linguísticas

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-success.svg)

> API para criação, visualização e gerenciamento de símbolos visuais associados a caracteres, pontuações e outros elementos linguísticos.

---

## 📑 Índice
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Configuração](#configuração)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## 🛠️ Pré-requisitos

- **Node.js** v18+
- **Python** 3.10+
- **npm** (Node Package Manager)
- **Live Server** (extensão do VSCode ou similar)

### Bibliotecas essenciais
- express
- nodemon
- uuid
- jest

---

## 🚀 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/FreitasProcopio/API_WAW.git
cd API_WAW
```

2. **Instale as dependências do backend:**

```bash
cd backend
npm install
```

3. **Instale as dependências do frontend (opcional):**

```bash
cd ../frontend
npm install  # Se necessário
```

4. **Instale o Python:**

Baixe em [python.org](https://www.python.org/downloads/)

---

## ▶️ Uso

### 1. Inicie o backend (Node.js):

```bash
cd backend
npm run dev
```

### 2. Inicie o frontend (Python):

```bash
cd ../frontend
python app.py
```

### 3. Abra o Live Server

Abra o arquivo `frontend/pages/main.html` com o Live Server (VSCode ou extensão).

### 4. Preencha os dados na página e utilize as rotas da API conforme necessário.

#### Exemplos de uso da API

```bash
# Listar todas as palavras
curl http://localhost:3000/all

# Buscar por tipo
curl http://localhost:3000/type/Letter

# Criar nova palavra
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"language":"pt","type":"substantivo","people":"tupi","contexto":"exemplo"}'
```

#### Rotas principais

| Método | Rota                  | Descrição                                         |
|--------|-----------------------|---------------------------------------------------|
| GET    | `/all`                | Retorna todos os dados em `db.json`               |
| GET    | `/type/:type`         | Filtra os dados por tipo                          |
| GET    | `/image/:language`    | Busca imagem por língua                           |
| POST   | `/create`             | Cria uma nova entrada                             |
| PUT    | `/update`             | Atualiza uma palavra                              |
| DELETE | `/delete`             | Deleta uma palavra                                |

---

## 🧪 Testando a API com Insomnia

1. **Baixe e instale o [Insomnia](https://insomnia.rest/download)**
2. **Crie um novo workspace** no Insomnia para organizar suas requisições.
3. **Importe a coleção de endpoints** (se disponível) ou crie manualmente:
   - Clique em **"New Request"**
   - Defina o método (GET, POST, PUT, DELETE, etc.)
   - Digite a URL da rota desejada (ex: `http://localhost:3000/all`)
   - Configure os cabeçalhos (ex: `Content-Type: application/json`) e o corpo da requisição, se necessário
   - Clique em **"Send"** para enviar a requisição e veja a resposta da API

> O Insomnia facilita o teste de todos os endpoints da API, permitindo visualizar respostas, enviar bodies customizados e automatizar seus testes de integração.

---

## ⚙️ Configuração

- **Variáveis de ambiente:**
  - Configure variáveis no arquivo `.env` se necessário (exemplo: porta do servidor, caminhos de arquivos).
- **Arquivos de dados:**
  - `backend/src/data/db.json` — base de dados principal.
  - `frontend/symbols.json` — símbolos do frontend.

---

## 🛣️ Roadmap

- [ ] Melhorar autenticação e segurança
- [ ] Adicionar testes automatizados para todas as rotas
- [ ] Documentação interativa da API (Swagger/OpenAPI)
- [ ] Deploy em ambiente cloud

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'feat: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

Consulte o [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

---

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

---

## 📬 Contato

- Issues: [https://github.com/FreitasProcopio/API_WAW/issues](https://github.com/FreitasProcopio/API_WAW/issues)
- GitHub: [FreitasProcopio](https://github.com/FreitasProcopio)

> Créditos aos colaboradores e à comunidade open source!

---

