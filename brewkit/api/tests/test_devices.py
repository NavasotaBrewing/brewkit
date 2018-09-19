import unittest

from .. import controllers
from .. import devices

class TestDevices(unittest.TestCase):

    def test_thermostat(self):
        omega = controllers.Omega('/dev/ttyAMA0', 1)
        thermo = devices.Thermostat(omega, 'My thermostat')
        assert type(thermo) is controllers.Omega
        assert thermo.pv()
        assert thermo.sv(230.4)
        assert thermo.sv() == 230.4
        thermo.run()
        assert thermo.is_running()
        thermo.stop()
        assert not thermo.is_running()

    def test_relay(self):
        board = controllers.STR116('/dev/ttyAMA0', 2)
        relay = devices.Relay(board, 5, 'My New Relay')
        assert relay.name == 'My New Relay'
        relay.set(1)
        assert relay.get() == 1
        relay.set(0)
        assert relay.get() == 0
