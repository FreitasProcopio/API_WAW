# Endpoint `/people`

O endpoint `/people` permite filtrar as palavras cadastradas pelo povo.

## Visão Geral

- **Método:** POST
- **URL:** `/people`
- **Descrição:** Retorna um array de palavras que possuem o povo informado no corpo da requisição.

## Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/people \
  -H "Content-Type: application/json" \
  -d '{"people": "tupi"}'
```

## Exemplo de Body JSON

```json
{
  "people": "tupi"
}
```

## Exemplo de Resposta

```json
{
  "id": "...",
  "people": "tupi",
  // ...outros campos
}
```

## Aplicações Práticas

- Listar palavras associadas a um povo específico.
- Implementar filtros culturais ou étnicos em sistemas educacionais.

!!! note "Dica"
    O campo `people` deve ser igual ao cadastrado no sistema (ex: "tupi", "brasileiro").
