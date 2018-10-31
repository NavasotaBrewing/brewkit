import json

from .controllers import STR116, Omega
from ..app.log import log

def update(config):
    """
    Supply a config and this will update the "state" fields with actual values of hardware
    """
    config = json.loads(config)
    log.info('starting update')
    log.info(config)
    for device_type, devices in config['devices'].items():
        for device in devices:
            if device_type == 'thermostat':
                # Find Controller
                con = Omega('/dev/ttyAMA0', int(device['controller_address']))
                # Get SV and PV
                device['sv'] = con.sv()
                device['pv'] = con.pv()
                # Get State
                device['state'] = int(con.is_running())
            else:
                # Find controller
                con = STR116('/dev/ttyAMA0', int(device['controller_address']))
                # Get state
                device['state'] = con.relay(int(device['address']))
    log.info('ending update')
    log.info(config)
    return config

def enact(config):
    config = json.loads(config)
    for device_type, devices in config['devices'].items():
        for device in devices:
            if device_type == 'thermostat':
                # Find Controller
                con = Omega('/dev/ttyAMA0', device['controller_address'])
                # Set SV
                con.sv(device['sv'])
                # Set State
                if device['state']:
                    con.run()
                else:
                    con.stop()
            else:
                # Find controller
                con = STR116('/dev/ttyAMA0', device['controller_address'])
                # Set state
                con.relay(device['address'], device['state'])
