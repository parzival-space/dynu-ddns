const { get, post } = require('./request');

const api = 'https://api.dynu.com/v2';

module.exports = {

  getDomain: async  (domain, token) => {
    let resp = await get(`${api}/dns`, { "API-Key": `${token}`});

    // try getting domain ID
    return resp.domains.find(d => d.name === domain);
  },


  setDomain: async (id, token, data) => {
    let resp = await post(`${api}/dns/${id}`, data, { "API-Key": `${token}`});

    return resp.statusCode == 200;
  }
}