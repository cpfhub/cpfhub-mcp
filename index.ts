#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

const API_KEY = process.env.CPFHUB_API_KEY;
const BASE_URL = "https://api.cpfhub.io";

if (!API_KEY) {
  console.error("Error: CPFHUB_API_KEY environment variable is required.");
  process.exit(1);
}

const server = new Server(
  {
    name: "cpfhub-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "lookup_cpf",
        description: "Consulta informações de um CPF brasileiro (nome, gênero, data de nascimento).",
        inputSchema: {
          type: "object",
          properties: {
            cpf: {
              type: "string",
              description: "Número do CPF (apenas dígitos ou formatado)",
            },
          },
          required: ["cpf"],
        },
      },
      {
        name: "get_quota_info",
        description: "Retorna informações sobre o saldo de créditos e plano do usuário.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "lookup_cpf") {
      const cpf = (args?.cpf as string).replace(/\D/g, "");
      const response = await axios.get(`${BASE_URL}/cpf/${cpf}`, {
        headers: { "x-api-key": API_KEY },
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } else if (name === "get_quota_info") {
      // Nota: O endpoint de quota pode variar, usando o padrão MCP descrito no mcp.md
      const response = await axios.get(`${BASE_URL}/mcp`, {
        params: { api_key: API_KEY },
        // Simula uma chamada de tool do MCP para o backend
        data: {
          method: "tools/call",
          params: { name: "get_quota_info", arguments: {} }
        }
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    }

    throw new Error(`Tool not found: ${name}`);
  } catch (error: any) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: error.response?.data?.message || error.message,
        },
      ],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("CPFHub MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
