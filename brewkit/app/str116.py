import serial
import time
import binascii

from .log import log
from .exceptions import InvalidHardwareError, RelayNotFoundError

class STR116(object):
    def __init__(self, port, address, baud_rate=19200, timeout=0.05):
        self.port = str(port)
        self.address = int(address)
        self.baud_rate = baud_rate
        self.name = 'default'

        try:
            self.device = serial.Serial(self.port, self.baud_rate)
        except serial.serialutil.SerialException as err:
            log.error("Invalid Hardware for STR116 using port %s and address %s" % (self.port, self.address))
            raise InvalidHardwareError("Invalid Hardware for STR116 using port %s and address %s" % (self.port, self.address))

        self.device.timeout = timeout

    def relay(self, relay_num, state=None):
        if state == None:
            return self.get_relay(relay_num)
        else:
            return self.set_relay(relay_num, state)

    def construct_bytestring(self, command, datastring):
        if type(command) is not str:
            raise ValueError("Command needs to be a string")

        if type(datastring) is not str or len(datastring) == 0:
            raise ValueError("Please supply a valid datastring, you gave: '" + str(datastring) + "'")

        # All the pieces in order

        # These are the parts of the bytestring that are static
        MA0 = '55'
        MA1 = 'AA'

        # Bytecount
        # Bytecount is # of bytes from here to end. Will always be 5 + number of `data` bytes, variable.
        BC = 5
        # Every 2 characters of the datastring is a byte
        BC += int(len(datastring) / 2)
        # Make it a string and pad it with zeroes
        BC = str(BC).zfill(2)
        assert len(BC) == 2

        CC = command
        assert len(CC) == 2

        # Controller number
        CN = str(self.address).zfill(2)
        assert len(CN) == 2

        # Do nothing to the datastring after validating

        # Checksum
        CS = self.get_checksum(BC + CC + CN + datastring)
        assert len(CS) == 2

        MAE = '77'

        bytestring = MA0 + MA1 + BC + CC + CN + datastring + CS + MAE
        return bytestring

    def num_in_hex(self, relay_num):
        return str(hex(int(relay_num)).replace('0x', '').zfill(2))

    def get_relay(self, relay_num):
        # Convert to hex
        relay_num = self.num_in_hex(relay_num)

        if len(relay_num) > 2:
            raise RelayNotFoundError('Relay not found, could be out of bounds')

        bytestring = self.construct_bytestring('14', relay_num + '01')

        relay_status = self.write(bytestring)
        return int(relay_status[7:8])

    def set_relay(self, relay_num, state):

        relay_num_hex = str(hex(int(relay_num)).replace('0x', '').zfill(2))


        datastring = relay_num_hex + '01' + str(state).zfill(2)
        bytestring = self.construct_bytestring('17', datastring)

        self.write(bytestring)
        if self.get_relay(relay_num) == state:
            log.debug('Setting relay %s to %s: success' % (relay_num, state))

    def write(self, data):
        # Write data to board and return a response if there is one
        message_bytes = binascii.unhexlify(data)
        try:
            self.device.write(message_bytes)
            if self.device.open:
                time.sleep(0.05)
                size = self.device.in_waiting
                if size:
                    data = self.device.read(size)
                    return binascii.hexlify(data)
                else:
                    log.debug('no data returned')
            else:
                log.error('device not open')
        except IOError as e:
            log.exception(e)

    def get_checksum(self, data):
        checksum = sum(bytearray.fromhex(data))
        checksumstripped = hex(checksum).replace('0x', '')
        return checksumstripped.zfill(2)
