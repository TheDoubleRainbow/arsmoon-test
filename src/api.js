const crypto = require('crypto');

export default {
  url: process.env.VUE_APP_API_URL,
  proxy: process.env.VUE_APP_PROXY_URL,
  secret: process.env.VUE_APP_API_SECRET,
  key: process.env.VUE_APP_API_KEY,

  getHeaders(path, method = 'GET', data = '') {
    const expires = Math.round(new Date().getTime() / 1000) + 60;
    const signature = crypto.createHmac('sha256', this.secret).update(method + path + expires + data).digest('hex');

    return {
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'api-expires': expires,
      'api-key': this.key,
      'api-signature': signature,
    };
  },
};
