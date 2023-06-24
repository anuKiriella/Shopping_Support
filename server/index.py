from fastapi import FastAPI
from routes.dress import dress

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

previous_val = "None"


# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dress)
print("<============== Server started ==============>")
