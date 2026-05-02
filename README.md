# cpfhub-mcp: Official MCP Server for CPFHub.io

**Official [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server for [CPFHub.io](https://cpfhub.io) — Brazilian CPF Lookup API for AI agents.**

[![npm version](https://img.shields.io/npm/v/@cpfhub/mcp)](https://www.npmjs.com/package/@cpfhub/mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## What is CPFHub.io?

CPFHub.io is a REST API that returns identity data — full name, gender, and date of birth — from any Brazilian CPF number, in ~300ms, with 99.9% uptime and full LGPD compliance.

**10M+ CPFs queried · 1,300+ active companies · 99.9% uptime**

---

## Tools

This MCP server exposes the following tools:

| Tool | Description |
| :--- | :--- |
| `get_person_by_cpf` | Retrieve identity data (full name, gender, date of birth) from a Brazilian CPF number |
| `get_quota_information` | Retrieve remaining API credits and current plan status |

### Tool Definition

```json
{
  "name": "get_person_by_cpf",
  "description": "Retrieve identity data from a Brazilian CPF number",
  "parameters": {
    "type": "object",
    "properties": {
      "cpf": {
        "type": "string",
        "description": "Brazilian CPF number (digits only or formatted as XXX.XXX.XXX-XX)"
      }
    },
    "required": ["cpf"]
  }
}
```

---

## Quick Start

```bash
# Set your API key
export CPFHUB_API_KEY=your_api_key_here

# Run the MCP server directly with npx (no install needed)
npx @cpfhub/mcp
```

Get your free API key at [app.cpfhub.io](https://app.cpfhub.io) — no credit card required.

---

## curl Example

```bash
curl -X GET "https://api.cpfhub.io/cpf/12345678909" \
  -H "x-api-key: YOUR_API_KEY"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "cpf": "12345678909",
    "name": "Fulano de Tal",
    "nameUpper": "FULANO DE TAL",
    "gender": "M",
    "birthDate": "15/06/1990",
    "day": 15,
    "month": 6,
    "year": 1990
  }
}
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

1. Go to **Settings** > **Features** > **MCP**.
2. Click **+ Add New MCP Server**.
3. Name: `CPFHub`
4. Type: `command`
5. Command: `export CPFHUB_API_KEY=YOUR_API_KEY_HERE && npx -y @cpfhub/mcp`

### Windsurf

Add to your MCP configuration file:

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

---

## OpenAI Function Calling Example

```python
import os
import json
import requests
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
CPFHUB_API_KEY = os.environ["CPFHUB_API_KEY"]

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_person_by_cpf",
            "description": "Retrieve identity data from a Brazilian CPF number",
            "parameters": {
                "type": "object",
                "properties": {
                    "cpf": {"type": "string", "description": "Brazilian CPF number"}
                },
                "required": ["cpf"],
            },
        },
    }
]

def get_person_by_cpf(cpf: str) -> dict:
    response = requests.get(
        f"https://api.cpfhub.io/cpf/{cpf.replace('.', '').replace('-', '')}",
        headers={"x-api-key": CPFHUB_API_KEY},
    )
    return response.json()

messages = [{"role": "user", "content": "Who is the person with CPF 123.456.789-09?"}]
response = client.chat.completions.create(model="gpt-4o", messages=messages, tools=tools)
message = response.choices[0].message

if message.tool_calls:
    args = json.loads(message.tool_calls[0].function.arguments)
    result = get_person_by_cpf(args["cpf"])
    print(result)
```

---

## LangChain Example

See [`examples/langchain_example.py`](examples/langchain_example.py) for a full LangChain agent integration example.

---

## Requirements

- Node.js 18 or higher
- A valid API key from [app.cpfhub.io](https://app.cpfhub.io)

---

## Important Links

| Resource | URL |
| :--- | :--- |
| Documentation | [https://cpfhub.io/documentacao](https://cpfhub.io/documentacao) |
| Dashboard | [https://app.cpfhub.io](https://app.cpfhub.io) |
| OpenAPI Specification | [https://github.com/cpfhub/cpfhub-openapi](https://github.com/cpfhub/cpfhub-openapi) |
| Node.js SDK | [https://github.com/cpfhub/cpfhub-node](https://github.com/cpfhub/cpfhub-node) |
| Python SDK | [https://github.com/cpfhub/cpfhub-python](https://github.com/cpfhub/cpfhub-python) |
| All SDKs | [https://github.com/cpfhub](https://github.com/cpfhub) |

---

## License

MIT © [CPFHub.io](https://cpfhub.io)
