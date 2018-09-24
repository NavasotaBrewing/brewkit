"""
I know this is messy, but I've been having problems with minimalmodbus for weeks and the author has abandoned it.
This is my best option. Sometimes the serial communication fails and you have to retry, hence the while True loops.

Note: This module will always prefer floats over ints
"""
from os import getenv
import warnings

from omegacn7500 import OmegaCN7500
import minimalmodbus
import serial

from .log import log
from .exceptions import InvalidHardwareError

class Omega():
    """
    A wrapper for OmegaCN7500. Dear god help me...
    Note: "Omega", "CN7500", and "PID" all refer to the same thing. It's an Omega CN7500 PID. Sometimes I refer to heaters as the PID, because I'm slightly retarded.
    """

    def __init__(self, port, address, baudrate=19200, timeout=0.05):
        Omega.test_connection(port, address)

        self.instrument = OmegaCN7500(port, address)
        self.instrument.serial.baudrate = baudrate
        self.instrument.serial.timeout = timeout
        self.name = None

    @staticmethod
    def test_connection(port, address):
        """
        Returns True if communication with the Omega runs without error.
        """
        try:
            instrument = OmegaCN7500(port, address)
            instrument.get_pv()
            return True
        except serial.serialutil.SerialException:
            raise InvalidHardwareError(
                'Omega device cannot be found on port %s, address %s' % (port, address)
            )

    def pv(self):
        """
        Get the Proccess Value (PV)
        """
        while True:
            try:
                return float(self.instrument.get_pv())
            except IOError as err:
                log.exception(err)

    def sv(self, temp=None):
        if temp:
            # Set sv
            while True:
                try:
                    self.instrument.set_setpoint(float(temp))
                    if self.name:
                        log.info("Setting '%s' setpoint value to %s" % (self.name, str(temp)))
                    return float(temp)
                except IOError as err:
                    log.exception(err)
        else:
            # get sv
            while True:
                try:
                    return float(self.instrument.get_setpoint())
                except IOError as err:
                    log.exception(err)

    def is_running(self):
        """
        Returns `True` if the CN7500 is powering the heating element, AKA it's "on"
        """
        while True:
            try:
                return self.instrument.is_running()
            except IOError as err:
                log.exception(err)

    def run(self):
        """
        Turn on the CN7500
        """
        while True:
            try:
                self.instrument.run()
                if self.name:
                    log.info("Turning on " + self.name)
                return True
            except IOError as err:
                log.exception(err)

    def stop(self):
        """
        Turns off the CN7500
        """
        while True:
            try:
                self.instrument.stop()
                if self.name:
                    log.info("Turning off " + self.name)
                return True
            except IOError as err:
                log.exception(err)
