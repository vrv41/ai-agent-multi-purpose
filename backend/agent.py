# agent.py
from langchain_ollama import OllamaLLM
import time

class Agent:
    def __init__(self):
        print("Initializing LLM agent...")
        self.llm = OllamaLLM(
            model="mistral",  # or phi/gemma for speed
            temperature=0.3,
            system="Be concise and precise."
        )

    def ask(self, prompt: str) -> str:
        start = time.time()
        response = self.llm.invoke(prompt)
        print(f"LLM response time: {time.time() - start:.2f}s")
        return response

_agent_instance = None

def ask_agent_lazy_init():
    global _agent_instance
    if _agent_instance is None:
        _agent_instance = Agent()
    return _agent_instance
