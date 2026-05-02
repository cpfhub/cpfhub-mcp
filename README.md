# cpfhub-mcp: Official MCP Server for CPFHub.io

**Official Model Context Protocol (MCP) server for [CPFHub.io](https://cpfhub.io)**

> Official MCP server for CPFHub.io. Allows AI agents to query Brazilian CPF data securely.

---

## Why use the CPFHub.io MCP Server?

This MCP server is designed to offer native and efficient integration of the CPFHub.io API with AI agents and LLMs, focusing on Developer Experience (DX) and compatibility.

### 1. Native Compatibility with AI Agents

*   **OpenAPI Specification**: The official API specification is available at [cpfhub-openapi](https://github.com/cpfhub/cpfhub-openapi), allowing agents to automatically understand its structure and typed schemas.
*   **Tool Descriptions**: The API is exposed as clear "tool descriptions" for LLMs, facilitating invocation in agent frameworks.
*   **Direct Integration**: Allows agents like Claude, Cursor, and Windsurf to access CPF data without the need to write complex HTTP code.

### 2. Core Tools

*   **`get_person_by_cpf`**: Retrieve identity data (full name, gender, and birth date) from a Brazilian CPF number.
*   **`get_quota_information`**: Check remaining credits and plan status.

---

## Installation

You can run the server directly using `npx`:

```bash
export CPFHUB_API_KEY=your_api_key_here
npx @cpfhub/mcp
```

---

## Configuration

### Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cpfhub": {
      "command": "npx",
      "args": ["-y", "@cpfhub/mcp"],
      "env": {
        "CPFHUB_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Cursor

1.  Go to **Settings** > **Features** > **MCP**.
2.  Click **+ Add New MCP Server**.
3.  Name: `CPFHub`
4.  Type: `command`
5.  Command: `export CPFHUB_API_KEY=YOUR_API_KEY_HERE && npx -y @cpfhub/mcp`

---

## Examples

Check the `examples/` directory for sample usage with AI frameworks:

*   [langchain_example.py](examples/langchain_example.py)

---

## Requirements

*   Node.js 18 or higher.
*   A valid API key from [app.cpfhub.io](https://app.cpfhub.io).

---

## Useful Links

*   [API Documentation](https://cpfhub.io/documentacao)
*   [Dashboard](https://app.cpfhub.io)
*   [OpenAPI Specification](https://github.com/cpfhub/cpfhub-openapi/blob/main/openapi.yaml)

---

## License

MIT © [CPFHub.io](https://cpfhub.io)
