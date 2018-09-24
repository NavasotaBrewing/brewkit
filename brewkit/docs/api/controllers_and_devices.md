# Controllers and Devices
These are classes that map software behavior to physical controllers and devices.

A controller is something on the RS-485 protocal. The 2 we currently use are an STR116 Relay board, and an OmegaCN7500 PID controller.

Devices are more specific, like a relay on a board, or a thermostat on a PID. Controllers can have many devices, but each device has only one controller. The OmegaCN7500 can only support one Thermostat at a time, but the principle is the same.


## Controllers
### Port
All controllers will usually be on the same serial port. This will be different depending on how you've installed your hardware. We use a hat on a raspberry pi, using the serial port `'/dev/ttyAMA0'`. Each controller in these examples will use this port, but a different address each.

### Importing
```python
# For CLI use
from brewkit import *
# For Python use
from brewkit.api.controllers import STR116, Omega
```

### STR116
```python
# After importing above
port = '/dev/ttyAMA0'
adr = 2
board = STR116(port, adr)

# It's possible to use relays directly from the board object
# but you should use the Relay device object below

# Get relay 4 state
board.relay(4)
# Turn relay 4 on
board.relay(4, 1)
# Turn relay 2 off
board.relay(2, 0)
```

### Omega
```python
# After importing above
port = '/dev/ttyAMA0'
adr = 1
omega = Omega(port, adr)

# It's possible to use the Omega controller directly, but you should use the Thermostat device object below

# Get process value
omega.pv()
# Get setpoint value
omega.sv()
# Set setpoint value
omega.sv(150)
```

## Devices
Every device needs a controller. See the section above about initializing controllers.

### Importing
```python
# For CLI use
from brewkit import *
# for python use
from brewkit.api.devices import Relay, Thermostat
```

### Relay
A relay needs a board to operate on. See the [STR116](#STR116) section above about creating an STR116 object.
```python
# Make sure we have an STR116 board
assert type(board) is STR116

# Relay object set for relay 6 on the STR116 board
# Name is optional. If a name is set, you'll get a log and console message when setting a relay, which is fun.
relay = Relay(board, 6, "HLT Relay")

# Get state
relay.get()

# Set state
relay.set(1)
```

### Thermostat
Thermostats need an Omega to operate on. See the [Omega](#Omega) section above.

With the type of Omega we have, an Omega only supports one Thermostat at a time.
```python
# Make sure we have an omega
assert type(omega) is Omega

# Like a Relay, the name is optional, it will supply more information and logs, which is mega cool
thermo = Thermostat(omega, 'RIMS Thermostat')

# Turn it on
thermo.run()

# Turn it off
thermo.stop()

# Get the PV
thermo.pv()

# Get or set the SV
thermo.sv()
thermo.sv(150)
```
