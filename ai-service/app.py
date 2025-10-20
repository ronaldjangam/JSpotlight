from flask import Flask, request, jsonify
from PIL import Image
import io
import torch
from transformers import CLIPProcessor, CLIPModel

app = Flask(__name__)

# Load CLIP model (much better than ResNet18)
print("Loading CLIP model (this may take a minute on first run)...")
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
print("✓ CLIP model loaded successfully!")

# Comprehensive categories for photo tagging
CATEGORIES = [
    # People & Portraits
    "person", "people", "portrait", "selfie", "group photo", "family", "friends",
    "man", "woman", "child", "baby", "crowd",
    
    # Nature & Landscapes
    "landscape", "nature", "mountains", "hills", "valley", "cliff",
    "beach", "ocean", "sea", "lake", "river", "waterfall", "water",
    "forest", "trees", "woods", "jungle", "desert",
    "sunset", "sunrise", "sky", "clouds", "rainbow",
    "snow", "winter", "rain", "storm",
    
    # Urban & Architecture
    "city", "urban", "building", "skyscraper", "architecture",
    "street", "road", "highway", "bridge", "tunnel",
    "house", "home", "apartment", "office", "store", "shop",
    
    # Animals & Wildlife
    "animal", "dog", "cat", "bird", "horse", "wildlife",
    "pet", "puppy", "kitten", "fish", "insect", "butterfly",
    
    # Food & Dining
    "food", "meal", "dinner", "lunch", "breakfast",
    "restaurant", "cafe", "dessert", "fruit", "vegetable",
    "drink", "coffee", "wine", "beer",
    
    # Indoor Scenes
    "indoor", "room", "bedroom", "living room", "kitchen",
    "office", "bathroom", "interior",
    
    # Outdoor Activities
    "outdoor", "park", "garden", "playground", "camping",
    "hiking", "walking", "running",
    
    # Events & Occasions
    "event", "party", "celebration", "wedding", "birthday",
    "concert", "festival", "ceremony",
    
    # Sports & Exercise
    "sports", "exercise", "gym", "fitness", "yoga",
    "running", "cycling", "swimming", "soccer", "basketball",
    
    # Transportation
    "car", "vehicle", "truck", "bus", "train", "airplane",
    "motorcycle", "bicycle", "boat", "ship",
    
    # Art & Culture
    "art", "painting", "sculpture", "museum", "gallery",
    "music", "instrument", "performance",
    
    # Technology
    "computer", "laptop", "phone", "smartphone", "technology",
    "screen", "electronics",
    
    # Nature Elements
    "flowers", "plants", "garden", "grass", "leaves",
    "rocks", "stones", "sand",
    
    # Time & Lighting
    "night", "dark", "evening", "morning", "daytime",
    "bright", "light", "shadow",
    
    # Travel & Tourism
    "travel", "vacation", "tourism", "destination",
    "hotel", "resort", "landmark", "monument"
]

def predict_tags(image_bytes, top_k=8):
    """
    Predict tags using CLIP with zero-shot classification.
    Returns relevant tags with confidence > threshold.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Prepare inputs for CLIP
        inputs = processor(
            text=CATEGORIES,
            images=image,
            return_tensors="pt",
            padding=True
        )
        
        # Get predictions
        with torch.no_grad():
            outputs = model(**inputs)
            logits_per_image = outputs.logits_per_image
            probs = logits_per_image.softmax(dim=1)
        
        # Get top-k predictions
        top_probs, top_indices = probs[0].topk(top_k)
        
        # Filter tags with confidence > 12% threshold
        tags = []
        for prob, idx in zip(top_probs, top_indices):
            confidence = prob.item()
            if confidence > 0.12:  # 12% confidence threshold
                tag = CATEGORIES[idx.item()]
                tags.append(tag)
                print(f"  - {tag}: {confidence:.2%}")
        
        return tags if tags else ["photo"]
    
    except Exception as e:
        print(f"Error in predict_tags: {e}")
        return ["photo"]

@app.route("/predict", methods=["POST"])
def predict():
    """Endpoint to predict tags for an uploaded image"""
    if not request.data:
        return jsonify({'tags': ['no-image']}), 400
    
    try:
        print("\n🔍 Analyzing image with CLIP...")
        tags = predict_tags(request.data)
        print(f"✓ Generated {len(tags)} tags")
        return jsonify({'tags': tags})
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'tags': ['error'], 'message': str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model': 'CLIP (openai/clip-vit-base-patch32)',
        'categories': len(CATEGORIES),
        'description': 'Advanced AI vision model for photo tagging'
    })

if __name__ == "__main__":
    print("\n" + "="*50)
    print("🚀 JSpotlight AI Service with CLIP")
    print("="*50)
    app.run(host="0.0.0.0", port=5000)
