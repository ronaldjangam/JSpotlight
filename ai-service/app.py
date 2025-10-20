from flask import Flask, request, jsonify
from PIL import Image
import io
import torch
from torchvision import models, transforms
from torchvision.models import ResNet18_Weights
import os

app = Flask(__name__)

# Load pre-trained ResNet model
print("Loading ResNet18 model...")
model = models.resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)
model.eval()

# Define image transformations
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Load ImageNet class labels
LABELS = []
labels_file = "imagenet_classes.txt"

if os.path.exists(labels_file):
    with open(labels_file) as f:
        LABELS = [line.strip() for line in f.readlines()]
    print(f"Loaded {len(LABELS)} ImageNet class labels")
else:
    print("Warning: imagenet_classes.txt not found. Using generic labels.")
    LABELS = [f"class_{i}" for i in range(1000)]

def predict_tags(image_bytes):
    """Predict top 3 tags for an image using ResNet18"""
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        input_tensor = transform(image).unsqueeze(0)
        
        with torch.no_grad():
            output = model(input_tensor)
        
        # Get top 3 predictions
        _, indices = output.topk(3)
        tags = [LABELS[idx] for idx in indices[0].tolist()]
        return tags
    except Exception as e:
        print(f"Error predicting tags: {str(e)}")
        return ["error", "unknown"]

@app.route("/predict", methods=["POST"])
def predict():
    """Endpoint to predict image tags"""
    if not request.data:
        return jsonify({'tags': ['no-image']}), 400
    
    try:
        tags = predict_tags(request.data)
        return jsonify({'tags': tags})
    except Exception as e:
        return jsonify({'tags': ['error'], 'error': str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'model': 'resnet18'})

if __name__ == "__main__":
    print("Starting AI service on port 5000...")
    app.run(host="0.0.0.0", port=5000)
