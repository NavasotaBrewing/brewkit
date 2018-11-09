from flask import Flask, render_template
from flask_socketio import SocketIO

from brewkit.api.configuration import enact, update

app = Flask(__name__)
socket = SocketIO(app)

@app.route('/')
def home():
    return "Brewkit API endpoint. If you see this, something went wrong."

@socket.on('update')
def handle_update(config):
    socket.emit('new_config', update(str(config)))

@socket.on('enact')
def handle_enact(config):
    config = str(config).replace('\'', '"')
    enact(config)
    handle_update(config)

@socket.on('save_configuration')
def save_configuration(new_config):
    with open('brewkit/interface/data/configurations.json') as fi:
        configs = json.load(fi)
    try:
        configs[:] = [d for d in configs if d.get(
            'id') != new_config['id']]
        configs.append(new_config)
        with open('brewkit/interface/data/configurations.json', 'w') as fi:
            json.dump(configs, fi, indent=2)
        return 'Configuration saved'
    except KeyError:
        return "Configuration needs an 'id' element"

@socket.on('get_configurations')
def serve_configurations():
    with open('brewkit/interface/data/configurations.json') as fi:
        return json.dumps(json.load(fi))

if __name__ == '__main__':
    app.debug = True
    socket.run(app, '0.0.0.0')
