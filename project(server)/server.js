var express = require('Express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});

io.on("connection", (socket) => {
    console.log('a user connected')
    socket.on("message", (arg) => {
        console.log(arg);
      });
});
 

server.listen(3000);
