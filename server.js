var fs = require('fs')
var http = require('http')

var date = new Date()

function formDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

var server = http.createServer((req, res) => {
    if(res.url !== '/favicon.ico') {
        res.writeHead(200, { "Content-Type": "text/html"})
        const myreadystream = fs.createReadStream(__dirname + '/views/http_demo.html', 'utf-8')
        myreadystream.pipe(res)
    }
})

var io = require('socket.io')(server);
io.on("connection", function(socket) {
    var clientIp = socket.request.connection.remoteAddress
    console.info("socket连接成功")
    socket.on("link_to_server", function(msg, nick) {
        io.emit("link_to_client", `${nick} : ${msg} ${formDate(date)}`)
    })
    console.log(clientIp);
})

server.listen(8080, '127.0.0.1');
console.info("servers is running......")