import unittest

from docopt import docopt

from .. import __doc__ as doc, main


class TestBasic(unittest.TestCase):
    def test_basic(self):
        assert True

    def test_response(self):
        args = docopt(doc, ['api'])
        assert main(args) == 'api'

        args = docopt(doc)
        assert main(args) == 'cli'

        args = docopt(doc, ['interface'])
        assert main(args) == 'interface'

