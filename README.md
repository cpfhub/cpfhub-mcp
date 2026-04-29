# @cpfhub/mcp

**Official Model Context Protocol (MCP) server for [CPFHub.io](https://cpfhub.io)**

Query Brazilian CPF data directly from AI agents like Claude, Cursor, and Windsurf using a standardized protocol.

---

## Features

- **lookup_cpf**: Get full name, gender, and date of birth from any Brazilian CPF.
- **get_quota_info**: Check your remaining credits and plan status.
- **LGPD Compliant**: Built with privacy and security in mind.
- **Fast**: ~300ms average response time.

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

Add this to your `claude_desktop_config.json`:

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

---

## Requirements

- Node.js 18 or higher.
- A valid API Key from [app.cpfhub.io](https://app.cpfhub.io).

---

## License

MIT © [CPFHub.io](https://cpfhub.io)
