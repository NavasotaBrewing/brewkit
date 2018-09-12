# Configuration
A "configuration" in this context is a digital model of the brewing rig. Here's an example of a configuration:
```json
{
  // Coming soon
}
```
The interface is supplied with a configuration like this one. The `api` package is responsible for taking a built configuration from the interface, along with some instructions, and fulfilling those instructions using the configuration provided. For example, a valve object on a configuration might include 2 fields:
```json
{
  ...
  "state": 1,        // Actual current state
  "new_state": 0     // Desired state
  ...
}
```
This configuration is `POSTED` to the `api`, which finds the `new_state` field and actually flips the relay over. This is just a basic example of how a configuration is used at the moment. This will develop over time.
