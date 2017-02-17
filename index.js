const server = require('./bin/server');
const http = require('http');

let httpPort = process.env.PORT || 3000;
let app = server.Server.bootstrap().app;
app.set('port', httpPort);

let httpServer = http.createServer(app);
httpServer.listen(httpPort);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen')
    throw error;

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  console.log('eRA Portal Backend listening on ' + bind);
}
