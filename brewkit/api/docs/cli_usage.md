# CLI Usage
This is basic CLI usage for when the interface is not practical

## Example Setup
```python
# First, import everything you need
from brewkit import *
# NOTE: you should only import * like this when using the CLI


# Next, set up your controllers. For example, we have one STR116 and one Omega, both using the same port, different addresses
port = '/dev/ttyAMA0'
omega = Omega(port, 1)
board = STR116(port, 2)

# Then set up your devices to model how you have them installed
# Maybe there's a pump on relay 3 on our str116 board
pump = Relay(board, 3)

# And then a few relays
hlt_valve = Relay(board, 0)
hlt_to_mash = Relay(board, 1)
rims_to_mash = Relay(board, 2)

# And then maybe we have a thermostat in the RIMS
rims = Thermostat(omega)


# You can also use the logger if you want
log.info("All set up")
```

## Using this configuration
Here's an example of using the configuration we set up above. Info may vary depending on how you have device hardware installed.

```python
# continued from above ...

# Divert the rims valve back to the mash tank
rims_to_mash.set(1)
# turn on the pump relay
pump.set(1)
# Set the rims SV to something
rims.sv(172)
# Turn on the rims thermostat
rims.run()
```


See [api/controllers and devices](api/controllers_and_devices.md) for more detailed documentation.
