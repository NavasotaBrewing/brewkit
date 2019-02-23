import json

from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO

from configuration import enact, update

app = Flask(__name__)
socket = SocketIO(app)


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

if __name__ == '__main__':
    app.debug = True
    socket.run(app, '0.0.0.0', 5000)
