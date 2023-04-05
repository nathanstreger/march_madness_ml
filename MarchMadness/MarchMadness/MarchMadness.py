from flask import Flask

app = Flask(__name__)

@app.route('/hello', methods=["GET"])
def hello_world():
    return 'Hello World'

#Anthony, to build off this server, define more app.routes and functions tied to those routes.
#you will need to run pip install flask as well.