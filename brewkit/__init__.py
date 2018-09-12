"""
Usage:
    brewkit api
    brewkit interface
"""

from brewkit.app import str116, omega
from brewkit.app.log import log

from docopt import docopt

def main(args=None):
    if not args:
        args = docopt(__doc__, version="0.0.0")

    if args['interface']:
        log.info('starting interface')

    elif args['api']:
        log.info('starting API')

if __name__ == '__main__':
    main()
