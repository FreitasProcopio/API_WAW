# Endpoint `/image/:language`

O endpoint `/image/:language` retorna a imagem (em PNG/base64) associada à língua informada.

## Visão Geral

- **Método:** GET
- **URL:** `/image/:language`
- **Descrição:** Busca a imagem vinculada à língua passada como parâmetro.

## Exemplo de Requisição

```bash
curl http://localhost:3000/image/pt --output imagem.png
```

## Exemplo de Resposta

- Conteúdo binário de imagem PNG (ou base64, dependendo da implementação).

## Aplicações Práticas

- Exibir o símbolo visual de uma língua em interfaces.
- Baixar imagens para uso em materiais didáticos.

!!! note "Dica"
    Se não houver imagem para a língua, o endpoint retorna status 404.
