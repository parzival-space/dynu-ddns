# Dynu-DDNS

Uses the Dynu API to automatically updates the ddns entrys of your domain.</br>
This application is intended to run as a system service on system startup.</br>
</br>
By default, the application tries to fetch the current IP address every hour.</br>
If it detects that the IP has changed, the domain gets updated.</br>

</br>

## Installation

It is recommended to use <a href="https://www.npmjs.com/package/forever-service">forever-service</a> to install dynv6-ddns as a system service.

```bash
# Install forever-service
npm i -g forever forever-service

# Pull this repository and install dependencies
git clone https://github.com/malte-linke/dynu-ddns.git
cd ./dynu-ddns
npm i

# Install this node application
forever-service install dynu-ddns -s app.js
```

### Uninstall

To install Dynu-DDNS service you can just run the command below:

```bash
forever-service delete dynu-ddns
```

</br>

## Configuration

To configure the application you just have to edit the config.json file with the following synthax:

<table>
  <tr><th>Property</th><th>Type</th><th>Description</th><th>Example</th></tr>
  <tr><td>zone</td><td>String</td><td>The Domain you want to update.</td><td>example.org</td></tr>
  <tr><td>token</td><td>String</td><td>Your <a href="https://www.dynu.com/ControlPanel/APICredentials">API-Key</a>.</td><td>ASDhpoahsdohasODHOhsDASohooA-g</td></tr>
  <tr><td>ipv4Enabled</td><td>Boolean</td><td>Do you want to update the IPv4 address?</td><td>true</td></tr>
  <tr><td>ipv6Enabled</td><td>Boolean</td><td>Do you want to update the IPv6 address?</td><td>false</td></tr>
  <tr><td>interval</td><td>Number</td><td>The update interval in hours.</td><td>1</td></tr>
</table>

### Example

```json
{
  "zone": "<<YOUR DOMAIN>>",
  "token": "<<YOUR API KEY>>",

  "ipv4Enabled": true,
  "ipv6Enabled": false,

  "interval": 1
}
```

</br>

## API Endpoints

These are the APIs the applications uses:</br>
<a href="https://seeip.org/">seeip.org</a> to fetch current IP adress (IPv4 and IPv6).</br>
<a href="https://www.dynu.com/">dynv6.com</a> to update your DNS records.</br>
