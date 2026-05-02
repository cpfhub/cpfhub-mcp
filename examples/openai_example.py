"""
Example: Using CPFHub MCP tool with OpenAI function calling.

Requirements:
  pip install openai

Usage:
  export OPENAI_API_KEY=your_openai_key
  export CPFHUB_API_KEY=your_cpfhub_key
  python openai_example.py
"""

import os
import json
import requests
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
CPFHUB_API_KEY = os.environ["CPFHUB_API_KEY"]

# Define the get_person_by_cpf tool for OpenAI function calling
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_person_by_cpf",
            "description": "Retrieve identity data (full name, gender, and date of birth) from a Brazilian CPF number.",
            "parameters": {
                "type": "object",
                "properties": {
                    "cpf": {
                        "type": "string",
                        "description": "Brazilian CPF number (digits only or formatted as XXX.XXX.XXX-XX)",
                    }
                },
                "required": ["cpf"],
            },
        },
    }
]


def get_person_by_cpf(cpf: str) -> dict:
    """Call the CPFHub API to retrieve identity data for a CPF number."""
    response = requests.get(
        f"https://api.cpfhub.io/cpf/{cpf.replace('.', '').replace('-', '')}",
        headers={"x-api-key": CPFHUB_API_KEY},
    )
    return response.json()


def run_agent(user_message: str):
    messages = [{"role": "user", "content": user_message}]

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools,
    )

    message = response.choices[0].message

    # Handle tool call if the model requests it
    if message.tool_calls:
        tool_call = message.tool_calls[0]
        args = json.loads(tool_call.function.arguments)
        result = get_person_by_cpf(args["cpf"])

        messages.append(message)
        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result),
        })

        final_response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
        )
        print(final_response.choices[0].message.content)
    else:
        print(message.content)


if __name__ == "__main__":
    run_agent("What is the name and birth date of the person with CPF 123.456.789-09?")
