This is me brainstorming and trying to write my ideas down so I don't forget them. This info may not be true and will probably change, but i'll try to keep it updated for now.

# Lifecycle
I need to define the 3 parts to this package first.

1. `app`: this is the backend code that controls the devices
2. `interface`: this is the web interface that the user interacts with
3. `api`: this is the middleman between the `app` and the `interface`

## Basic Lifecycle
A configuration is built by the user completely on the front end. They model the configuration after the devices they have set up on the rig. Then the configuration is posted to the API, which writes it to a file for future use.

When you load the front end, you'll choose a configuration. Every few seconds, the front end will `POST` the config to the API, which will update the live `state` values on all the devices to keep the information accurate. This will happen as often as possible while retaining speed for many devices.

Upon changing a value on the front end (`new_state`), the interface will once again `POST` the configration to the API, which will fulfill the instruction and flip the relay or whatever it needs to do.
