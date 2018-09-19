import unittest
import json

from ..example_configuration import example
from ..configuration import Configuration

example = json.dumps(example)


class TestConfiguration(unittest.TestCase):
    def setUp(self):
        self.example = example
        self.con = Configuration(self.example)

    def test_populate_controllers(self):
        con = Configuration(example)
        assert len(con.controllers) > 1

    # def test_populate_devices(self):
    #     con = Configuration(example)
    #     assert len(con.devices) > 2

    def test_wrong_type_of_data(self):
        with self.assertRaises(ValueError):
            Configuration({'with': 'a', 'dict': 'not', 'a': 'str'})

    def test_to_json(self):
        # Assert that is loads properly
        assert self.con.original == example
        assert json.loads(self.con.to_json()) == example
