const { getIPv4, getIPv6 } = require('./lib/myIP');
const { getDomain, setDomain } = require('./lib/dynu');

// load config
const config = require('./config.json');

// print banner
require('./lib/banner');

// store last IP address
var lastIPv4 = "";
var lastIPv6 = "";

// updates your IP address on Dynu in 7 easy steps
async function updateIP() {
  
  // step 1: get current IP addresses (IPv4 and IPv6)
  let ipv4 = await getIPv4();
  let ipv6 = await getIPv6();

  // step 2: check if IPv4 address has changed. ignore if it has not changed or is disabled in config.json
  if ((ipv4 == lastIPv4 || !config.ipv4Enabled) && (ipv6 == lastIPv6 || !config.ipv6Enabled)) return;
  console.log("New IPv4 or IPv6 Address detected.");

  // step 3: get current domain informations
  console.log(`Fetching current domain informtaions for ${config.zone}...`);
  let domain = await getDomain(config.zone, config.token);

  // step 4: update domain informtaions
  domain.ipv4Address = config.ipv4Enabled ? ipv4 : domain.ipv4Address; // only update IPv4 address if enabled in config.json
  domain.ipv6Address = config.ipv6Enabled ? ipv6 : domain.ipv6Address; // only update IPv6 address if enabled in config.json

  // setp 5: send updated domain informtaions to Dynu
  console.log(`Updating domain informtaions for ${config.zone}...`);
  let success = await setDomain(domain.id, config.token, domain);

  // step 6: update last IP address
  lastIPv4 = ipv4;
  lastIPv6 = ipv6;

  // step 7: print success message
  if (success) console.log(`Successfully updated domain.`);
  else console.error(`Failed to update domain.`);

}

// update IP address every x hours (configured in config.json)
setInterval(updateIP, config.interval * 60 * 60 * 1000);

// spawn check on startup
updateIP();