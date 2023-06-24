from fastapi import APIRouter, UploadFile, File
import shutil
import os
from controller.dress import DressDetector, ColorDetector, DressMatcher
from models.dress import Dress
dress = APIRouter()

@dress.post('/dress_detect')
async def dress_detect(file: UploadFile = File(...)):
    try:
        # Save the uploaded image to a temporary location
        with open(file.filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Define the destination directory for storing the image
        destination_dir = "img"
        
        # Move the image to the destination directory
        file_path = shutil.move(file.filename, os.path.join(destination_dir, file.filename))
        
        dress_type = DressDetector(file_path)
        dress_color = ColorDetector(file_path)
        
        return {"dress_type": dress_type ,
                "dress_color": dress_color }
    except Exception as e:
        return {"error": str(e)}

@dress.post('/dress_match')
async def dress_match(dress: Dress):
    try:
        res = DressMatcher(dress)
        return {"message": res }
    except Exception as e:
        return {"error": str(e)}



