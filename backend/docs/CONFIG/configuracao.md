# ⚙️ Configuração para Desenvolvimento

## Modo de Desenvolvimento

Para executar o servidor backend em modo de desenvolvimento com recarga automática:

```bash
npm run dev
```

## Testes

Para executar todos os testes automatizados:

```bash
npm test
```

Para executar os testes em modo de observação (watch):

```bash
npm run test:watch
```

## Documentação

Para gerar a documentação estática (pasta `site`):

```bash
mkdocs build
```

Para visualizar a documentação localmente com recarga automática:

```bash
mkdocs serve
```

!!! note "Dica"
    Certifique-se de estar na pasta onde está o arquivo `mkdocs.yml` antes de rodar os comandos de documentação.