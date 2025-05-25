# Endpoint `/type/:type`

O endpoint `/type/:type` permite filtrar as palavras cadastradas pelo campo tipo.

## Visão Geral

- **Método:** GET
- **URL:** `/type/:type`
- **Descrição:** Retorna um array de palavras que possuem o tipo informado.

## Exemplo de Requisição

```bash
curl http://localhost:3000/type/Letter
```

## Exemplo de Resposta

```json
[
  {
    "id": "...",
    "type": "Letter",
    // ...outros campos
  }
]
```

## Aplicações Práticas

- Listar apenas palavras de um determinado tipo (ex: letras, substantivos).
- Filtrar conteúdos em interfaces de usuário.

!!! note "Dica"
    O parâmetro `type` diferencia maiúsculas de minúsculas.
