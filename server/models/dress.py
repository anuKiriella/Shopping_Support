from pydantic import BaseModel


class Dress(BaseModel):
    colors: int
    dress_type: int
    skin_tone: int
    
