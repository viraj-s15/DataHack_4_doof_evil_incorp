from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from fastapi import FastAPI
import uvicorn

app = FastAPI()

checkpoint = "bigscience/mt0-large"

tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSeq2SeqLM.from_pretrained(checkpoint, torch_dtype="auto", device_map="auto",early_stopping=True)


@app.get("/")
async def translate():
  return {"message":"hello"}

@app.get("/translate_text/")
async def translate(user_id:int,text:str,og_lang:str,translated_lang:str):
  original_language = og_lang
  encoded_input = tokenizer.encode(f"Translate to {translated_lang}: {text}.", return_tensors="pt").to("cuda")
  output = model.generate(encoded_input)
  translated_text = tokenizer.decode(output[0])
  return {"original_text":text,"original_language":original_language,"translated_language":translated_lang,"transated_text":translated_text}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)