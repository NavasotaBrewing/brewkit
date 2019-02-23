import os

import logzero
from logzero import logger

# logfile = 'brewkit.log'
logfile = os.path.expanduser('~') + "/brewkit.log"
logzero.logfile(logfile, maxBytes=1e6, backupCount=3)

log = logger
# from log import log
