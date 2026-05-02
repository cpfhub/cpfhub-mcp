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
        name: "get_person_by_cpf",
        description: "Retrieve identity data (full name, gender, and date of birth) from a Brazilian CPF number.",
        inputSchema: {
          type: "object",
          properties: {
            cpf: {
              type: "string",
              description: "Brazilian CPF number (digits only or formatted as XXX.XXX.XXX-XX)",
            },
          },
          required: ["cpf"],
        },
      },
      {
        name: "get_quota_information",
        description: "Retrieve the remaining API credits and current plan status for the authenticated account.",
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
    if (name === "get_person_by_cpf") {
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
    } else if (name === "get_quota_information") {
      const response = await axios.get(`${BASE_URL}/mcp`, {
        params: { api_key: API_KEY },
        data: {
          method: "tools/call",
          params: { name: "get_quota_information", arguments: {} }
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
