

import http = require('http');
import express = require('express');

const serverPort = 3002;
const serverHost = '127.0.0.1';

const app = express();
const httpServer = http.createServer(app);
const server = httpServer.listen(serverPort, serverHost, () => {});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

import { HelloExec } from '../../functions/src/class/hello-exec';

app.get('/testA', async(request, response) => {

  const hello = new HelloExec();
  await hello.test();
  return response.send('test all finished');
});

