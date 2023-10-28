import fitz
import requests
import time
from fastapi import FastAPI, UploadFile, File

app = FastAPI()

API_URL = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-ROMANCE-en"
HEADERS = {"Authorization": "Bearer <insert token here pls>"}

def translate_text(text):
    payload = {"inputs": text}
    response = requests.post(API_URL, headers=HEADERS, json=payload)
    return response.json()[0]["translation_text"]

@app.post("/translate")
async def translate_pdf(pdf_file: UploadFile):
    with pdf_file.file as pdf_data:
        doc = fitz.open(pdf_data)
        outputs = ""
        for page in doc:
            text = page.get_text()
            outputs += text

    translated_text = ""
    for i in range(0, len(outputs), 500):
        text_chunk = outputs[i:i+500]
        translated_text_chunk = translate_text(text_chunk)
        translated_text += translated_text_chunk
        time.sleep(60)

    return {"translated_text": translated_text}
