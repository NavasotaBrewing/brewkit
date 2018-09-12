# Omega
This module is pretty straight forward. It controls an Omega PID, we use the OmegaCN7500. It has only been tested on the CN7500, but other devices should work in the same way.

This is mostly a wrapper over [OmegaCN7500](https://minimalmodbus.readthedocs.io/en/master/apiomegacn7500.html) from the [MinimalModbus](https://github.com/pyhys/minimalmodbus) package. It simplifies the interface a bit.

# How to use
## Connecting
To connect to the Omega
```python
# Don't forget to import the package
from brewkit.app.omega import Omega

# Your port and address will probably be different
omega = Omega('/dev/ttyAMA0', 1)
```
Upon initializing the `Omega` class, it will check for an actual omega. If it doesn't find one or there are problems connecting, an `InvalidHardwareError` will be raised. This is a custom error in the `brewkit/app/omega.py` module.
```python
omega = Omega('/dev/notAPort', 8675309) # this throws an InvalidHardwareError
```

## Usage
After initializing the omega ([see connection info](#connecting)), there are a few things you can do.

The omega has a "setpoint value" (`sv`) and a "process value" (`pv`). You can read the `pv`, and you can read and set the `sv`. See below

```python
# Get pv
omega.pv()    # 134.2

# Get sv
omega.sv()    # 172.0

# Set sv
omega.sv(204) # True

# Get sv again
omega.sv()    # 204
```

You can also turn on the relay like so:
```python
# Check if it's running
omega.is_running() # True or False

# Turn it on
omega.run()

# Turn it off
omega.stop()
```

## `test_connection`
A static method is available: `Omega.test_connection`. It takes a `port` and an `address`. It will return `True` if it finds an Omega connected, and raise an `InvalidHardwareError` otherwise. This method is called automatically when initializing a new Omega.
```python
# If there is an omega
Omega.test_connection('/dev/ttyAMA0', 1) # True

# If there's not an omega
Omega.test_connection('/dev/notAPort', 5000) # Raises InvalidHardwareError
```
