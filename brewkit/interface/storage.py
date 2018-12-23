import json
import uuid
import os


class Storage(object):
    def __init__(self, file_name, custom_path=False):
        self.data_path = os.path.dirname(os.path.realpath(__file__)) + '/data/'
        if custom_path:
            data_path = custom_path

        self.fi = self.data_path + file_name

    def write(self, data):
        with open(self.fi, 'w') as fi:
            json.dump(data, fi, indent=2)

    def read(self):
        with open(self.fi, 'r') as fi:
            return json.load(fi)

    def add(self, obj):
        if not 'id' in obj.keys():
            obj['id'] = str(uuid.uuid4())

        data = self.read()
        data.append(obj)
        self.write(data)

    def remove(self, obj):
        data = self.read()
        data.remove(obj)
        self.write(data)
