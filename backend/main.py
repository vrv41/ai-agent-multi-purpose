from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from agent import ask_agent_lazy_init
from file_parser import parse_pdf, parse_csv
import os
import asyncio

app = FastAPI()

# Enable CORS for Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# File upload directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Route: Simple prompt chat
@app.post("/chat")
async def chat(prompt: str = Form(...)):
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(None, ask_agent_lazy_init().ask, prompt)
    return {"response": response}

# Route: File upload only
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    content = ""
    if file.filename.endswith(".pdf"):
        content = parse_pdf(file_path)
    elif file.filename.endswith(".csv"):
        content = parse_csv(file_path)
    else:
        return {"error": "Unsupported file type. Only PDF and CSV are allowed."}

    return {"content": content}

# Route: Chat with file + prompt
@app.post("/chat_with_file")
async def chat_with_file(prompt: str = Form(...), file: UploadFile = File(...)):
    # Save uploaded file
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Parse file based on type
    content = ""
    if file.filename.endswith(".pdf"):
        content = parse_pdf(file_path)
    elif file.filename.endswith(".csv"):
        content = parse_csv(file_path)
    else:
        return {"error": "Unsupported file type. Only PDF and CSV are allowed."}

    # Combine document with user query
    full_prompt = f"Based on the following document content:\n\n{content}\n\nAnswer the following: {prompt}"

    # Call the LLM in a non-blocking way
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(None, ask_agent_lazy_init().ask, full_prompt)

    return {"response": response}
