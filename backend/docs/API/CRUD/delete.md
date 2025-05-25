# Endpoint `/delete`

O endpoint `/delete` permite remover uma palavra cadastrada no sistema, a partir do seu identificador único.

## Visão Geral

- **Método:** DELETE
- **URL:** `/delete`
- **Descrição:** Remove uma palavra existente pelo campo `id` ou `Id` informado no corpo da requisição.

## Exemplo de Requisição

```bash
curl -X DELETE http://localhost:3000/delete \
  -H "Content-Type: application/json" \
  -d '{"Id": "<id-da-palavra>"}'
```

## Exemplo de Body JSON

```json
{
  "Id": "<id-da-palavra>"
}
```

## Exemplo de Resposta

```json
{
  "message": "Palavra deletada com sucesso.",
  "palavra": {
    "Id": "<id-da-palavra>",
    // ...outros campos da palavra removida
  }
}
```

## Aplicações Práticas

- Remover palavras/símbolos que não são mais necessários.
- Manter a base de dados limpa e atualizada.

!!! note "Dica"
    Use o endpoint `/all` para conferir os ids disponíveis antes de deletar.
