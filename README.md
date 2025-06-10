# 🧠 VRV AI – Smart Q&A and Document Analysis App (Virtual Reasoning & Vision)

**VRV AI** (Virtual Reasoning & Vision) is a powerful AI-powered web application built to handle **general Q&A** and **document-based retrieval-augmented generation (RAG)**. It uses a modern tech stack, combining **Python, LangChain, Ollama**, and **Angular 20 with Tailwind CSS**. This app does **not store any user data in a database**, making it lightweight and privacy-friendly.

---

## 🚀 Features

- 🤖 **General AI Q&A** — Ask anything and get intelligent responses.
- 📄 **Document-based RAG** — Upload PDFs/CSVs and get context-aware answers from file content.
- 🧠 **LangChain + Ollama** — Local LLM integration with LangGraph workflows.
- ⚡ **Angular 20 Frontend** — Fast, modern UI with Tailwind CSS.
- 🛡️ **No Persistent Storage** — No user data is stored in any database.

---

## 🧱 Tech Stack

### 🔧 Backend
- **Python 3.10+**
- **FastAPI**
- **LangChain**
- **LangGraph**
- **Ollama** (for local LLMs)
- **PyPDF2 / CSV parsing**

### 🎨 Frontend
- **Angular v20**
- **Tailwind CSS**
- **ngModel binding**
- **File upload (PDF/CSV)**
- **Session-only chat display**

---

## 📁 Project Structure

## /vrv-ai
## ├── /frontend → Angular 20 + Tailwind app
## └── /backend → Python FastAPI + LangChain + Ollama



## ⚙️ Getting Started

### 🖥️ Backend Setup

1. **Install dependencies**
   
   cd backend
   pip install -r requirements.txt
Start Ollama locally (make sure you have Ollama installed)


ollama run llama3
Run the FastAPI server


uvicorn main:app --reload
Ensure any file parsing or AI models are correctly configured in your main.py and file_parser.py.

🌐 Frontend Setup
Install Angular CLI (if not already)


npm install -g @angular/cli
Install dependencies


cd frontend
npm install
Run the frontend app


ng serve
Access the app at: http://localhost:4200

📦 Environment Variables (Optional)
Add a .env in the backend folder for config like model selection or API keys if extended:


OLLAMA_MODEL=llama3
