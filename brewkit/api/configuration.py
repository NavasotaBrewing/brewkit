import json

from ..app.str116 import STR116
from ..app.omega import Omega
from ..app.log import log

class Configuration():
    def __init__(self, datastring):
        """
        Takes in a datastring in json format
        """
        if not type(datastring) is str:
            raise ValueError(
                'Datastring must be a str, %s given' % (str(type(datastring)))
            )

        # Don't modify
        self.original = datastring
        self.populate(datastring)

    def populate(self, datastring):
        data = json.loads(datastring)

        self.populate_controllers(data['controllers'])
        self.populate_devices(data['devices'])

    def populate_controllers(self, controller_data):
        self.controllers = []
        for controller_type, controllers in controller_data.items():
                for controller in controllers:
                    if controller_type == 'STR116':
                            new_controller = STR116(controller['port'], controller['address'])
                            new_controller.name = controller['name']
                            self.controllers.append(new_controller)
                    if controller_type == 'OmegaCN7500':
                        new_controller = Omega(controller['port'], controller['address'])
                        new_controller.name = controller['name']
                        self.controllers.append(new_controller)

    def populate_devices(self, devices):
        for device_type, device_list in devices.items():
            for device in device_list:
                log.info(device)

    def to_json(self):
        # Returns configuration as a json string
        return json.dumps(self.original)

    def __str__(self):
        # Alias for to_json()
        return self.to_json()

