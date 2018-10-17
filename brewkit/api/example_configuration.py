# A model of a 'configuration'

example = {
    'controllers': {
        # STR116 Relay Board
        'STR116': [
            {
                'port': '/dev/ttyAMA0',
                'address': 2,
                'type': 'STR116',
                'name': 'Main STR116'
            }
        ],
        # Omega CN7500 PID controller
        'OmegaCN7500': [
            {
                'port': '/dev/ttyAMA0',
                'address': 1,
                'type': 'OmegaCN7500',
                'name': 'RIMS Omega'
            }
        ]
    },
    'slackWebhook': 'https://hooks.slack.com/services/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',
    'id': '8675309',
    'slackChannel': '@luke',
    'devices': {
        'onOff': [
            {
                'address': '4',
                'state': 0,
                'proc_desc': 'A regular valve. Open or closed.',
                'controller_address': 2,
                'type': 'onOff',
                'name': 'HLT Valve',
                'states': {
                    '0': 'Closed',
                    '1': 'Open'
                }
            },
            {
                'address': '56',
                'state': 0,
                'proc_desc': 'A regular valve. Open or closed.',
                'controller_address': 2,
                'type': 'onOff',
                'name': 'Another On/Off Valve',
                'states': {
                    '0': 'Closed',
                    '1': 'Open'
                }
            }
        ],
        'pump': [
            {
                'address': 1,
                'state': 1,
                'proc_desc': 'A pump. On or off.',
                'controller_address': 2,
                'type': 'pump',
                'name': 'RIMS Pump',
                'states': {
                    '0': 'Off',
                    '1': 'On'
                }
            },
            {
                'address': '8',
                'state': 0,
                'proc_desc': 'A pump. On or off.',
                'controller_address': 2,
                'type': 'pump',
                'name': 'One More Pump',
                'states': {
                    '0': 'Off',
                    '1': 'On'
                }
            }
        ],
        'divert': [
            {
                'address': '4',
                'state': 0,
                'proc_desc': 'A divert valve. Select a location',
                'controller_address': 2,
                'type': 'divert',
                'name': 'Some Divert',
                'states': {
                    '0': 'mash',
                    '1': 'boil'
                }
            }
        ],
        'thermostat': [
            {
                'address': 0,
                'state': 1,
                'proc_desc': 'A thermostat. Set a temperature, or 0 to turn it off',
                'controller_address': 1,
                'type': 'thermostat',
                'name': 'RIMS Thermostat',
                'pv': 51.3,
                'sv': 173,
                'states': {
                    '0': 'Off',
                    '1': 'On'
                }
            }
        ],
        'variable': [
            {
                'address': 2,
                'state': 0,
                'proc_desc': 'A variable stepper valve. Enter a decimal between 0 and 1.',
                'controller_address': 2,
                'type': 'variable',
                'name': 'Propane Valve',
                'states': {
                    '0': 'Closed',
                    '1': 'Open'
                }
            }
        ]
    },
    'name': 'Testing'
}
