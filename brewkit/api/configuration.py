import json

from ..app.log import log

class Configuration():
    def __init__(self, datastring):
        """
        Takes in a datastring in json format
        """
        if not type(datastring) is str:
            raise ValueError('Datastring must be a str, %s given' % (str(type(datastring))))

        # Don't modify
        self.original = datastring
        self.populate(datastring)

    def populate(self, datastring):
        # Reads data passed in and sets to object attributes
        data = json.loads(datastring)
        for key in data.keys():
            setattr(self, key, data[key])
        log.info("Configuration named '%s' loaded successfully" % data['name'])

    def to_json(self):
        # Returns configuration as a json string
        return json.dumps(self.original)

    def __str__(self):
        # Alias for to_json()
        return self.to_json()
