const proxy = require('http-proxy-middleware');

import { SERVER } from './constants.js';

module.exports = function (app: { use: (arg0: any) => void }) {
  app.use(proxy('/auth', { target: SERVER }));
};
