# @cpfhub/mcp: Servidor MCP para Consulta de CPF (AI-Native)

**Official Model Context Protocol (MCP) server for [CPFHub.io](https://cpfhub.io)**

> Servidor oficial do Model Context Protocol (MCP) para a [CPFHub.io](https://cpfhub.io) — permitindo que agentes de IA consultem dados de CPF brasileiros (nome completo, data de nascimento, sexo) diretamente através de um protocolo padronizado.

---

## Por que usar o Servidor MCP do CPFHub.io?

Este servidor MCP foi projetado para oferecer uma integração nativa e eficiente da API do CPFHub.io com agentes de IA e LLMs, com foco em Developer Experience (DX) e compatibilidade.

### 1. Compatibilidade Nativa com Agentes de IA

*   **OpenAPI Specification**: Um arquivo `openapi.yaml` está disponível para descrever a API, permitindo que agentes entendam automaticamente sua estrutura e schemas tipados.
*   **Tool Descriptions**: A API é facilmente representável como "tool descriptions" para LLMs, facilitando a invocação em frameworks de agentes.
*   **Integração Direta**: Permite que agentes como Claude, Cursor e Windsurf acessem dados de CPF sem a necessidade de escrever código HTTP complexo.

### 2. Funcionalidades Principais

*   **`consultar_cpf`**: Obtém nome completo, gênero e data de nascimento a partir de qualquer CPF brasileiro.
*   **`obter_informacoes_cota`**: Verifica créditos restantes e status do plano.
*   **Conformidade com a LGPD**: Desenvolvido com foco em privacidade e segurança.
*   **Alta Performance**: Tempo médio de resposta de ~300ms.

---

## Instalação

Você pode executar o servidor diretamente usando `npx`:

```bash
export CPFHUB_API_KEY=sua_chave_api_aqui
npx @cpfhub/mcp
```

---

## Configuração

### Claude Desktop

Adicione o seguinte ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cpfhub": {
      "command": "npx",
      "args": ["-y", "@cpfhub/mcp"],
      "env": {
        "CPFHUB_API_KEY": "SUA_CHAVE_API_AQUI"
      }
    }
  }
}
```

### Cursor

1.  Vá para **Settings** > **Features** > **MCP**.
2.  Clique em **+ Add New MCP Server**.
3.  Nome: `CPFHub`
4.  Tipo: `command`
5.  Comando: `export CPFHUB_API_KEY=SUA_CHAVE_API_AQUI && npx -y @cpfhub/mcp`

---

## Requisitos

*   Node.js 18 ou superior.
*   Uma chave de API válida de [app.cpfhub.io](https://app.cpfhub.io).

---

## Links Úteis

*   [Documentação da API](https://cpfhub.io/documentacao)
*   [Dashboard](https://app.cpfhub.io)
*   [Especificação OpenAPI](openapi.yaml)

---

## Licença

MIT © [CPFHub.io](https://cpfhub.io)
