var fs = require('fs');

var infile = fs.createReadStream('./output.txt', {flags: 'r'});
var outfile = fs.createWriteStream('./output2.txt', {flags: 'w'});

infile.on('data', function(data){ //infile이 만들어지면서 data라는 이벤트가 발생함
    console.log('읽어 들인 데이터', data);
    outfile.write(data);
});

infile.on('end', function(){ //파일 읽기가 끝나면 end라는 이벤트가 발생함
    console.log('파일 읽기 종료.');
    outfile.end(function(){
        console.log('파일 쓰기 종료.');
    });
});