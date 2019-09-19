# brewkit

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


example configuration:
```json
{
    "name": "My configuration",
    "description": "Some configuration i made to brew in march or something idk",
    "id": "j3jhsmdnbk23j4gdf6872123",
    "mode": "Write",
    "slackWebhook": "https://slack.something/here",
    "slackChannel": "@luke",
    "RTUs": [
        {
            "name": "Main Valves",
            "location": "Over there",
            "id": "1kjhsmdnbfaskudf687234",
            "ipv4": "0.0.0.0:3012",
            "devices": [
                {
                    "driver": "STR1",
                    "addr": 0,
                    "controller_addr": 243,
                    "name": "some valve or something",
                    "state": "On",
                    "id": "s3h4ma8itu1lhfxcee"
                },
                {
                    "driver": "Omega",
                    "name": "RIMS PID",
                    "addr": 0,
                    "pv": 167.4,
                    "controller_addr": 0,
                    "id": "j12k3jhgsdkhfgj2h4bv4mnrb",
                    "sv": 172,
                    "state": "On"
                }
            ]
        }
    ]
}
```
