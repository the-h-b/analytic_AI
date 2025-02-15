from flask import Flask, request, jsonify
from flask_cors import CORS
from duckduckgo_search import DDGS

app = Flask(__name__)
CORS(app)

def analyze_code(code):
    if not code.strip():
        return "No code provided for analysis."
    
    prompt = f"""
    Analyze the following code and provide feedback on its correctness, efficiency, readability, complexity and potential improvements in one line each and rate the code on a scale of 1-5 on stars (mark the stars)and based on the suggestion generate a improved sample code as well :
    ```{code}```
    """
    try:
        result = DDGS().chat(prompt, model='claude-3-haiku')
        return result
    except Exception as e:
        return f"Error analyzing code: {str(e)}"

@app.route('/analyze', methods=['POST'])
def analyze():
    code = request.json.get('code', '')
    analysis = analyze_code(code)
    return jsonify({'analysis': analysis})

if __name__ == '__main__':
    app.run(port=5000)