import transformers
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import PyPDF2
import pdfkit
import torch
import fitz
import requests
import time

device = "cuda:0" if torch.cuda.is_available() else "cpu"
tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-ROMANCE-en")
model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-ROMANCE-en")


doc = fitz.open('/content/drive/MyDrive/pdfs_data/AFFAIRE A.A.K. c. TÜRKiYE.pdf')

outputs = ""
for page in doc:
  text = page.get_text()
  print(text)
  print('#' * 20)
  print(len(text))
  outputs += text
  print('#' * 20)

print(outputs)


API_URL = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-ROMANCE-en"
headers = {"Authorization": "Bearer <insert token here pls>"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

new_outputs = ""
for i in range(0,len(outputs) - 500,500):
  text = outputs[i:i+500]
  new_res = query({"inputs":text})
  print(new_res)
  new_outputs += new_res[0]["translation_text"]
  time.sleep(60)

print(outputs[0][0]["translation_text"])