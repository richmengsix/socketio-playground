var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io');
 
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function() {
    console.log('Listening at: http://localhost:8080');
});

var clients = [];

socketio.listen(server).on('connection', function (socket) {
    // Custom events
    socket.on('userConnected', function(userName) {
      var str = 'User connected: ' + userName;
      console.log(str);
      socket.emit('message', str);
    });

    socket.on('chat', function(msg) {
      console.log('Chat Received: ', msg.user, msg.text);
      str = msg.user + ": " + msg.text;
      // Everyone except for the socket that starts it
      socket.broadcast.emit('message', str);
    });
});