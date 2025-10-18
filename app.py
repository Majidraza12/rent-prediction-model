from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import json
import numpy as np

app = FastAPI()

# Debug: Try loading model
try:
    model = joblib.load("model.pkl")
    print("✅ Model loaded successfully")
except Exception as e:
    print("❌ Error loading model:", e)

# Debug: Try loading mappings
try:
    with open("label_to_code_mappings.json", "r") as f:
        mappings = json.load(f)
    print("✅ Mappings loaded successfully")
except Exception as e:
    print("❌ Error loading mappings:", e)

# Allow frontend requests (CORS setup)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this to frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],  # ✅ FIXED HERE
    allow_headers=["*"],  # ✅ FIXED HERE
)

# Define request schema using Pydantic
class RentInput(BaseModel):
    region: str
    type: str
    sqfeet: float
    beds: int
    baths: int
    comes_furnished: int
    laundry_options: str
    parking_options: str
    cats_allowed: int
    dogs_allowed: int

# Preprocessing function
def preprocess(data: RentInput):
    return np.array([[  
        mappings["region"].get(data.region, -1),
        mappings["type"].get(data.type, -1),
        data.sqfeet,
        data.beds,
        data.baths,
        data.comes_furnished,
        mappings["laundry_options"].get(data.laundry_options, -1),
        mappings["parking_options"].get(data.parking_options, -1),
        data.cats_allowed,
        data.dogs_allowed
    ]])

# Prediction endpoint
@app.post("/predict")
def predict(data: RentInput):
    print("📩 Received input:", data)
    try:
        input_array = preprocess(data)
        print("✅ Preprocessed input:", input_array)

        prediction = model.predict(input_array)
        print("✅ Prediction:", prediction)

        return {"predicted_rent": round(prediction[0], 2)}
    except Exception as e:
        print("❌ Error during prediction:", e)
        return {"error": str(e)}
