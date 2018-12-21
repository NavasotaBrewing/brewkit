import json

from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO

from brewkit.api.configuration import enact, update

app = Flask(__name__)
socket = SocketIO(app)

app.storage_file = 'brewkit/api/data/configurations.json'


def send_ip(url):
    # sends ip to interface so it knows where to connect
    import socket as interface_socket
    import requests
    interface = [l for l in ([ip for ip in interface_socket.gethostbyname_ex(interface_socket.gethostname())[2] if not ip.startswith("127.")][:1], [[(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s in [interface_socket.socket(interface_socket.AF_INET, interface_socket.SOCK_DGRAM)]][0][1]]) if l][0][0]

    requests.post(url + '/new_address', data=json.dumps({'address': interface}))



@app.route('/')
def home():
    return "Brewkit API endpoint. If you see this, something went wrong."

@socket.on('update')
def handle_update(config):
    config = json.dumps(config)
    return str(update(config))

@socket.on('enact')
def handle_enact(config):
    config = json.dumps(config)
    enact(config)
    return str(config)

@socket.on('save_configuration')
def save_configuration(new_config):
    with open(app.storage_file) as fi:
        configs = json.load(fi)
    try:
        configs[:] = [d for d in configs if d.get(
            'id') != new_config['id']]
        configs.append(new_config)
        with open(app.storage_file, 'w') as fi:
            json.dump(configs, fi, indent=2)
        return 'Configuration saved'
    except KeyError:
        return "Configuration needs an 'id' element"

@socket.on('get_configurations')
def serve_configurations():
    with open(app.storage_file) as fi:
        return json.dumps(json.load(fi))

@socket.on('delete_configuration')
def delete_configuration(config):
    print(config)
    with open(app.storage_file) as fi:
        configs = json.load(fi)
    configs = [con for con in
    configs if con['id'] != config['id']]
    with open(app.storage_file, 'w') as fi:
        json.dump(configs, fi, indent=2)
    return 'Configuration deleted'

if __name__ == '__main__':
    app.debug = True
    # send_ip('aws url')
    socket.run(app, '0.0.0.0', 5000)
