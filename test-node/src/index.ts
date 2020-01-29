

import http = require('http');
import express = require('express');


const serverPort = 3002;
const serverHost = '127.0.0.1';

const app = express();
const httpServer = http.createServer(app);
const server = httpServer.listen(serverPort, serverHost, () => {});


import { HelloExec } from '../../functions/src/class/hello-exec';
import { HelloIf } from '../../functions/model/hello';

app.get('/testA', async(request, response) => {

  const hello = new HelloExec();
  const aaa: HelloIf = {aaa: 'seees'};
  await hello.test(aaa);
return response.send('test all finished');

});

