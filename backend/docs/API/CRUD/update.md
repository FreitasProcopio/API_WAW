# Endpoint `/update`

O endpoint `/update` permite atualizar os dados de uma palavra já cadastrada no sistema, a partir do seu identificador único.

## Visão Geral

- **Método:** PUT
- **URL:** `/update`
- **Descrição:** Atualiza os campos de uma palavra existente pelo campo `id` ou `Id` informado no corpo da requisição.

## Exemplo de Requisição

```bash
curl -X PUT http://localhost:3000/update \
  -H "Content-Type: application/json" \
  -d '{
    "Id": "<id-da-palavra>",
    "contexto": "novo contexto atualizado"
  }'
```

## Exemplo de Body JSON

```json
{
  "Id": "<id-da-palavra>",
  "contexto": "novo contexto atualizado"
}
```

## Exemplo de Resposta

```json
{
  "message": "Palavra atualizada com sucesso.",
  "palavra": {
    "Id": "<id-da-palavra>",
    "contexto": "novo contexto atualizado",
    // ...outros campos da palavra
  }
}
```

## Aplicações Práticas

- Corrigir ou complementar informações de palavras já cadastradas.
- Manter a base de dados sempre atualizada.

!!! note "Dica"
    Use o endpoint `/all` para conferir os ids disponíveis antes de atualizar.
