import unittest
import json

from ..controllers import STR116, Omega
from ..configuration import enact, update


class TestConfiguration(unittest.TestCase):

    def setUp(self):
        self.stripped_config = json.dumps({
            "controllers": {
                "STR116": [
                    {"name": "Main STR116", "port": "/dev/ttyAMA0",
                        "address": 2, "type": "STR116"}
                ]
            },
            "devices": {
                "onOff": [
                    {
                        "states": {"1": "Open", "0": "Closed"},
                        "controller_address": 2,
                        "type": "onOff",
                        "name": "HLT Valve",
                        "address": "4",
                        "state": 0,
                        "proc_desc": "A regular valve. Open or closed."
                    },
                ],
                "thermostat": [
                    {
                        'address': 0,
                        'state': 1,
                        'proc_desc': 'A thermostat. Set a temperature, or 0 to turn it off',
                        'controller_address': 1,
                        'type': 'thermostat',
                        'name': 'RIMS Thermostat',
                        'pv': 51.3,
                        'sv': 173,
                        'states': {
                            '0': 'Off',
                            '1': 'On'
                        }
                    }
                ]
            }
        })
        self.board = STR116('/dev/ttyAMA0', 2)

    def test_enact_relay(self):
        self.board.relay(4, 1)
        assert self.board.relay(4) == 1

        enact(self.stripped_config) # this config turns it off

        assert not self.board.relay(4)

    def test_enact_thermo(self):
        thermo_data = json.loads(self.stripped_config)['devices']['thermostat'][0]
        thermo = Omega('/dev/ttyAMA0', thermo_data['controller_address'])

        thermo.sv(140)
        thermo.stop()

        assert thermo.sv() == 140
        assert not thermo.is_running()

        enact(self.stripped_config)

        assert thermo.sv() == 173
        assert thermo.is_running()

    def test_update(self):
        self.board.relay(4, 1)
        new_config = update(self.stripped_config)
        assert new_config['devices']['onOff'][0]['state'] == 1
        assert new_config['devices']['onOff'][0]['state'] != 0
        assert new_config != self.stripped_config
