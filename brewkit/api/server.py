from flask import Flask, render_template
from flask_socketio import SocketIO

from brewkit.api.configuration import enact, update

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def home():
    return "Brewkit API endpoint. If you see this, something went wrong."

@socketio.on('update')
def handle_update(config):
    socketio.emit('new_config', update(str(config)))

@socketio.on('enact')
def handle_enact(config):
    config = str(config).replace('\'', '"')
    enact(config)
    handle_update(config)

if __name__ == '__main__':
    app.debug = True
    socketio.run(app, '0.0.0.0')
