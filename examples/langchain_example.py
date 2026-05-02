import os
from langchain_community.tools import mcp
from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, AgentType

# Ensure your CPFHUB_API_KEY is set in your environment variables
# os.environ["CPFHUB_API_KEY"] = "your_api_key_here"

# Initialize the LLM
llm = ChatOpenAI(temperature=0, model="gpt-4")

# Load the MCP tool
# Note: You need to have the MCP server running or configured in your environment
tools = mcp.load_mcp_tools("cpfhub-mcp")

# Initialize the agent
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# Run the agent
cpf_to_lookup = "12345678900" # Replace with a valid CPF for testing
response = agent.run(f"Look up the identity data for the Brazilian CPF number {cpf_to_lookup}")

print(response)
