import numpy as np
import pandas as pd
#Load the saved Model
import tensorflow as tf
import tensorflow_hub as hub
from models.dress import Dress
import os
import joblib
current_directory = os.getcwd()

model_url = './controller/Clothes_Classification_v2.h5'
color_model_url = './controller/Color_Classification_v2.h5'

model = tf.keras.models.load_model(model_url ,  custom_objects={'KerasLayer':hub.KerasLayer})
color_model = tf.keras.models.load_model(color_model_url ,  custom_objects={'KerasLayer':hub.KerasLayer})


class_names = ['Lounge Pants', 'Nightdress' ,'Shirts' ,'Shorts' ,'Skirts' ,'Tops','Track Pants' ,'Tshirts']
color_class_names = ['black', 'blue' ,'brown' ,'green', 'red' ,'white']

def DressDetector(file_path: str):
    # load image

    img = load_and_prep_image(file_path)
    print('FILe Name type - ', type(file_path))

    #Make a Prediction
    pred = model.predict(tf.expand_dims(img , axis=0))

    #Get the predicted class
    pred_class =  class_names[np.argmax(tf.round(pred))]

    return pred_class
    
#Create a function to improt an image and resize it to be able to used with our model
def load_and_prep_image(filename , img_shape=224):

  print('FILe Name type - ', type(filename))
  img = tf.io.read_file(filename)
  print('img 1- ', type(img))
  img = tf.image.decode_image(img)
  print('img 2- ', type(img))

  img = tf.image.resize(img , size=[img_shape , img_shape])

  img = img/255.

  return img

def ColorDetector(file_path: str):

  img = load_and_prep_image(file_path)
  print('FILe Name type - ', type(file_path))

  #Make a Prediction
  pred = color_model.predict(tf.expand_dims(img , axis=0))

  #Get the predicted class
  pred_class = color_class_names[np.argmax(tf.round(pred))]

  return pred_class

# Load the model
load_model = joblib.load('./controller/match_model.joblib')


def DressMatcher(dress: Dress):
    try:
        obj = {'colors': [dress.colors],
               'dress_type': [dress.dress_type],
               'skin_tone': [dress.skin_tone]
               }
        df = pd.DataFrame(obj)
       
        s1 = df.iloc[:, :]
   
        pred = load_model.predict(s1)

        return pred.tolist()  # Convert the prediction to a list if needed
    except Exception as e:
        print("Error:", e)
        return None
