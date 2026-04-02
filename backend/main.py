from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests, os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, "..", ".env"))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Msg(BaseModel):
    text: str

HF_MODEL = "Qwen/Qwen2.5-72B-Instruct"
HF_URL = "https://api-inference.huggingface.co/v1/chat/completions"

def ask_ai(q: str) -> str:
    token = os.getenv("HF_TOKEN")
    if not token:
        return f"[테스트 모드] VODA AI입니다. 질문하신 '{q}'에 대한 답변을 준비 중입니다. (HF_TOKEN 설정 필요)"
        
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": HF_MODEL,
        "messages": [
            {"role": "system", "content": "당신은 VODA 서비스의 친절한 영화 전문가 AI입니다. 한국어로 답변해주세요."},
            {"role": "user", "content": q}
        ],
        "max_tokens": 500,
        "temperature": 0.7
    }
    
    try:
        res = requests.post(HF_URL, headers=headers, json=payload, timeout=30)
        res.raise_for_status()
        data = res.json()
        if "choices" in data and len(data["choices"]) > 0:
            return data["choices"][0]["message"]["content"]
        return f"오류: API 응답 형식이 예상과 다릅니다. ({data})"
    except Exception as e:
        error_msg = str(e)
        if hasattr(e, 'response') and e.response is not None:
            error_msg += f" - 응답내용: {e.response.text}"
        return f"AI 서비스 호출 중 오류가 발생했습니다: {error_msg}"

@app.post("/chat")
def chat(msg: Msg):
    reply = ask_ai(msg.text)
    return {"reply": reply}
