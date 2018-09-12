"""
Usage:
    brewkit api
    brewkit interface

Options:
  -h --help     Show this screen.
  --version     Show version.
"""

from app import str116, omega

from docopt import docopt

def main(args=None):
    if not args:
        args = docopt(__doc__, version="0.0.0")

    if args['interface']:
        print('starting interface')
        return 'interface'

    elif args['api']:
        print('starting API')
        return 'api'

if __name__ == '__main__':
    main()
