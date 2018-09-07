"""
Usage:
    brewkit
    brewkit api
    brewkit interface

Options:
  -h --help     Show this screen.
  --version     Show version.
"""

from docopt import docopt

def main():
    args = docopt(__doc__, version="0.0.0")

    if args['interface']:
        print('starting interface')

    elif args['api']:
        print('starting API')

    else:
        print('starting CLI')

if __name__ == '__main__':
    main()
