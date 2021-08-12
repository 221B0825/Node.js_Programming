var http = require('http');

var server = http.createServer();

var host = '192.168.10.129';
var port = 3000;
// server.listen(port,function(){
//     console.log('웹 서버가 시작되었습니다. : %d', port);
// });
server.listen(port,host,'50000',function(){
    console.log('웹 서버가 시작되었습니다. : %s, %d', host, port);
});
