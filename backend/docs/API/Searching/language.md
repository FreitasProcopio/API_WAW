# Endpoint `/language`

O endpoint `/language` permite filtrar as palavras cadastradas pela língua.

## Visão Geral

- **Método:** POST
- **URL:** `/language`
- **Descrição:** Retorna um array de palavras que possuem a língua informada no corpo da requisição.

## Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/language \
  -H "Content-Type: application/json" \
  -d '{"language": "pt"}'
```

## Exemplo de Body JSON

```json
{
  "language": "pt"
}
```

## Exemplo de Resposta

```json
[
  {
    "id": "...",
    "language": "pt",
    // ...outros campos
  }
]
```

## Aplicações Práticas

- Listar palavras de uma língua específica.
- Implementar filtros dinâmicos em sistemas multilíngues.

!!! note "Dica"
    O campo `language` deve ser igual ao cadastrado no sistema (ex: "pt", "en").
