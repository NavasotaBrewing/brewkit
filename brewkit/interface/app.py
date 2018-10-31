from flask import Flask, render_template
from flask_socketio import SocketIO

from brewkit.api.configuration import enact, update

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return 'hey there'

@socketio.on('update')
def handle_update(json):
    print(str(json))
    socketio.emit('new_config', update(str(json)))

@socketio.on('enact')
def handle_enact(json):
    data = str(json).replace('\'', '"')
    enact(data)
    handle_update()

if __name__ == '__main__':
    app.debug = True
    socketio.run(app, '0.0.0.0')
