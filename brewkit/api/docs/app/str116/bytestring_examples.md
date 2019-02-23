# Bytestrings
Here's a breakdown of how the bytestrings work. See the [command reference pdf](str116_commands_reference.pdf) for complete documentation.

# Get state
## Bytestring breakdown
Bytestring: `55AA07140200102d77`
```
=========================================================
| Name     | MA0 | MA1 | BC | CC | CN | Data | CS | MAE |
| Value    | 55  | AA  | 07 | 14 | 02 | 0010 | 2d | 77  |
=========================================================
```

* `MA0`, `MA1` are included in all bytestrings, required for the board.
* `BC`: bytecount from here to end
* `CC`: Command. See pdf for all commands. 2 common ones are `0x14` for `get` and `0x17` for `set`
* `CN`: Controller number. This one is `2`
* `Data`: Data to send. See breakdown below.
* `CS`: Checksum. See `str116.py` to see how this is calculated
* `MAE`: Master end, this is included on all bytestrings

## Data breakdown:
Datastring: `0010`

(from the `data` section of the bytestring above)
```
======================
| Start # | # relays |
|  00     |    10    |
======================
```
In this case, start at relay `00` and read `10` relays.

# Set state
Bytestring: `55AA0817020401002677`

```
==========================================================
| Name    | MA0 | MA1 | BC | CC | CN |  Data  | CS | MAE |
| Value   | 55  | AA  | 08 | 17 | 02 | 040100 | 26 | 77  |
==========================================================
```
* `MA0`, `MA1` are included in all bytestrings, required for the board.
* `BC`: bytecount from here to end
* `CC`: Command. See pdf for all commands. 2 common ones are `0x14` for `get` and `0x17` for `set`
* `CN`: Controller number. This one is `2`
* `Data`: Data to send. See breakdown below.
* `CS`: Checksum. See `str116.py` to see how this is calculated
* `MAE`: Master end, this is included on all bytestrings

## Data breakdown
Datastring: `040100`

(from the `data` section of the bytestring above)
```
===============================
| Relay # | # relays |  State |
|   04    |   01     |   00   |
===============================
```
Start at relay `04`, affect `01` relay, and set the state to `00`
