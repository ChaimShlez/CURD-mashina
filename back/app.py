from flask import Flask
from controller import all_blueprints

from flask_cors import CORS
app = Flask(__name__)
CORS(app,supports_credentials=True,origins=["http://localhost:5173","http://localhost:5175"])

for bp in all_blueprints:
    app.register_blueprint(bp)

@app.route('/',methods=["OPTIONS"])
def f():
    return 'OK'
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
