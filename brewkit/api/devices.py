from .controllers import STR116
from .controllers import Omega

class Thermostat(object):
    """
    This class just returns an Omega object because there can only ever be one thermostat per omega
    """
    def __new__(self, controller, name=None):
        self.name = name

        if not type(controller) is Omega:
            raise ValueError("Wrong type of controller. Thermostat must have an Omega controller")
        return controller

class Relay(object):
    def __init__(self, controller, relay_num, name=None):
        self.name = name

        if int(relay_num) < 0 or int(relay_num) > 15:
            raise ValueError('Relay number out of range')
        self.num = relay_num

        if not type(controller) is STR116:
            raise ValueError('Wrong controller type, relay needs an STR116 controller')
        self.board = controller

    def set(self, state):
        self.board.relay(self.num, state)

    def get(self):
        return self.board.relay(self.num)


