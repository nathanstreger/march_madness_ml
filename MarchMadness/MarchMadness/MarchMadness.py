from flask import Flask
from flask_cors import CORS
from flask.json import JSONEncoder

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return super().default(obj)

app = Flask(__name__)
app.json_encoder = CustomJSONEncoder
CORS(app)

@app.route('/hello', methods=["GET"])
def hello_world():
    return {'message': 'Hello World'}

#Anthony, to build off this server, define more app.routes and functions tied to those routes.
#you will need to run pip install flask as well.

app.run(port=48002)