import unittest

from brewkit.app.omega import Omega
from brewkit.app.exceptions import InvalidHardwareError

class TestOmega(unittest.TestCase):
    def setUp(self):
        self.port = '/dev/ttyAMA0'
        self.address = 1
        self.om = Omega(self.port, self.address)

    def test_pv(self):
        pv = self.om.pv()
        assert type(pv) is float

    def test_sv(self):
        old_sv = self.om.sv()
        assert type(old_sv) is float

        self.om.sv(old_sv + 5)
        assert self.om.sv() > old_sv

        self.om.sv(old_sv)
        assert self.om.sv() == old_sv

    def test_is_running(self):

        self.om.run()
        assert self.om.is_running()

        self.om.stop()
        assert not self.om.is_running()

    def test_test_connection(self):
        assert Omega.test_connection(self.port, self.address)

    def test_invalid_hardware(self):
        with self.assertRaises(InvalidHardwareError):
            Omega.test_connection('/dev/notaport', 56)
