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

        try:
            self.device = serial.Serial(self.port, self.baud_rate)
        except serial.serialutil.SerialException as err:
            log.error("Invalid Hardware for STR116 using port %s and address %s" % (self.port, self.address))
            raise InvalidHardwareError("Invalid Hardware for STR116 using port %s and address %s" % (self.port, self.address))

        self.device.timeout = timeout


        # These are the commands I use. See the command reference pdf
        self.byte_commands = {
            'get': '14',
            'set': '17'
        }

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

        CC = self.byte_commands[command]
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


    def get_relay(self, relay_num):
        '''Get the status of the requested relay (1/0)'''
        time.sleep(0.005)

        bytestring = self.construct_bytestring('get', '0010')

        relaystatus = self.write_message_with_response(bytestring)[6:-4]
        log.debug(relaystatus)
        log.debug('I think whats happening here is dad is getting all the relay statuses at once and reading them. I can optimize that.')

        try:
            return int(relaystatus[relay_num*2:relay_num*2+2])
        except ValueError as er:
            log.error("Relay couldn't be found, see error below")
            log.exception(er)
            raise RelayNotFoundError('Relay %s couldn\'t be found, make sure it is in range' % relay_num)

    def set_relay(self, relay_num, state):

        relay_num_hex = str(hex(relay_num).replace('0x', '').zfill(2))


        datastring = relay_num_hex + '01' + str(state).zfill(2)
        bytestring = self.construct_bytestring('set', datastring)

        self.write_message(bytestring)
        if self.get_relay(relay_num) == state:
            log.info('Setting relay %s to %s: success' % (relay_num, state))

    def write_message_with_response(self, data):
        # message_bytes = data.decode("hex")
        message_bytes = binascii.unhexlify(data)
        try:
            self.device.write(message_bytes)
            #print self.device.open  # True for opened
            if self.device.open:
                time.sleep(0.02)
                size = self.device.inWaiting()
                if size:
                    data = self.device.read(size)
                    # print binascii.hexlify(data)
                else:
                    log.error('no data')
            else:
                log.error('device not open')
        except IOError as e:
            # Failed to write to port
            log.exception(e)
        return binascii.hexlify(data)

    def write_message(self, data):
        # message_bytes = data.decode("hex")
        message_bytes = binascii.unhexlify(data)
        try:
            self.device.write(message_bytes)
            log.debug('Writing message: success')
        except IOError as e:
            log.error('Failed to write message')
            raise

    def get_checksum(self, data):
        checksum = sum(bytearray.fromhex(data))
        checksumstripped = hex(checksum).replace('0x', '')
        return checksumstripped.zfill(2)
