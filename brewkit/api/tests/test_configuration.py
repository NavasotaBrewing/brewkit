import unittest
import json

from ..controllers import STR116
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
                ]
            }
        })
        self.board = STR116('/dev/ttyAMA0', 2)

    def test_enact(self):
        self.board.relay(4, 1)
        assert self.board.relay(4)

        enact(self.stripped_config)

        assert not self.board.relay(4)

    def test_update(self):
        self.board.relay(4, 0)
        new_config = update(self.stripped_config)
        assert new_config != self.stripped_config
