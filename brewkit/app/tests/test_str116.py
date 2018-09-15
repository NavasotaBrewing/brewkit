import unittest
import serial
from time import sleep

from brewkit.app.str116 import STR116
from brewkit.app.log import log
from brewkit.app.exceptions import InvalidHardwareError, RelayNotFoundError

class TestSTR116(unittest.TestCase):
    def setUp(self):
        self.port = '/dev/ttyAMA0'
        self.address = 2
        self.board = STR116(self.port, self.address)

    def test_type(self):
        assert type(self.board) is STR116

    def test_serial(self):
        assert type(self.board.device) is serial.Serial
        # assert self.board.device.timeout == 0.05

    def test_invalid_hardware(self):
        with self.assertRaises(InvalidHardwareError):
            board = STR116('/dev/notaport', 4)

    def test_get_and_set_relay_state(self):
        self.board.relay(4, 1)
        assert self.board.relay(4) == 1

        self.board.relay(4, 0)
        assert self.board.relay(4) == 0

        self.board.relay(6, 1)
        assert self.board.relay(6) == 1

        self.board.relay(6, 0)
        assert self.board.relay(6) == 0

    def test_repeated_switches(self):
        i = 0
        while i < 5:
            self.board.relay(7, 1)
            sleep(0.04)
            self.board.relay(7, 0)
            sleep(0.04)
            i += 1

    def test_relay_not_found(self):
        with self.assertRaises(RelayNotFoundError):
            self.board.relay(45234)

    def test_construct_bytestring(self):
        bytestring = self.board.construct_bytestring('14', '0010')
        assert bytestring == '55AA07140200102d77'

        bytestring = self.board.construct_bytestring('17', '040100')
        assert bytestring == '55AA0817020401002677'

    # def test_gig_em(self):
    #     """
    #     Just for fun
    #     """
    #     def toggle():
    #         state = self.board.relay(2)
    #         if state == 1:
    #             self.board.relay(2, 0)
    #         else:
    #             self.board.relay(2, 1)

    #     sleep(0.5)
    #     toggle() # Hu
    #     sleep(0.18)
    #     toggle() # la
    #     sleep(0.18)
    #     toggle() # ba
    #     sleep(0.18)
    #     toggle() # loo
    #     sleep(0.42)

    #     toggle() # ken
    #     sleep(0.16)
    #     toggle() # nek
    #     sleep(0.38)

    #     toggle() # ken
    #     sleep(0.16)
    #     toggle() # nek
