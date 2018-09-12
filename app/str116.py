import serial
import time
import binascii

from .log import log
from .exceptions import InvalidHardwareError

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

    def relay(self, relay_num, state=None):
        if state == None:
            '''Get the status of the requested relay (1/0)'''
            time.sleep(0.005)

            # formerly str_to_checksum
            parts = '0714'
            parts += '02' # Controller Number (CN)
            parts += '0010'

            checksum = self.get_checksum(parts)

            bytestring = '55' # MA0
            bytestring += 'AA' # MA1
            bytestring += parts
            bytestring += str(checksum)
            bytestring += '77' # MAE

            relaystatus = self.write_message_with_response(bytestring)[6:-4]

            return int(relaystatus[relay_num*2:relay_num*2+2])
        else:
            #command to turn on relay is 0x08 0x17
            #format is
            #MA0, MA1, 0x08, 0x17, CN, start number output (relaynumber), \
            #number of outputs (usually 0x01), 00/01 (off/on), CS (calculated), MAE
            #need to do a checksum on 0x08, 0x17, CN, relaynumber, 0x01, 0x01
            relay_num_hex = hex(relay_num).replace('0x', '').zfill(2)

            # Formerly str_to_checksum
            parts = '0817'
            parts += '02' # Controller Number (CN)
            parts += str(relay_num_hex)
            parts += '01'
            parts += str(state).zfill(2)

            checksum = self.get_checksum(parts)

            bytestring = '55' # MA0
            bytestring += 'AA' # MA1
            bytestring += parts
            bytestring += str(checksum)
            bytestring += '77' # MAE

            self.write_message(bytestring)

    def write_message_with_response(self, data):
        message_bytes = data.decode("hex")
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
        message_bytes = data.decode("hex")
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
