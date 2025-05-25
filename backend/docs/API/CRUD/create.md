# Endpoint `/create`

O endpoint `/create` permite adicionar uma nova palavra ao sistema.

## Visão Geral

- **Método:** POST
- **URL:** `/create`
- **Descrição:** Cria uma nova palavra/símbolo com os campos informados no corpo da requisição.

## Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/create \
  -H "Content-Type: application/json" \
  -d '{
    "language": "português",
    "type": "substantivo",
    "people": "brasileiro",
    "contexto": "exemplo"
  }'
```

## Exemplo de Body JSON

```json
{
  "language": "português",
  "type": "substantivo",
  "people": "brasileiro",
  "contexto": "exemplo"
}
```

## Exemplo de Resposta

```json
{
  "id": "...",
  "language": "português",
  "type": "substantivo",
  "people": "brasileiro",
  "contexto": "exemplo",
  // ...outros campos gerados automaticamente
}
```

## Aplicações Práticas

- Adicionar novos símbolos ou palavras ao sistema.
- Permitir que usuários cadastrem conteúdos personalizados.

!!! note "Dica"
    Após criar, utilize o endpoint `/all` para conferir se a palavra foi cadastrada corretamente.
