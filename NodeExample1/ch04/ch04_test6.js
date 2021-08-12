var fs = require('fs');

//파일을 비동기식 IO로 읽어들임
fs.readFile('../package.json','utf8',function(err, data){
    //읽어 들인 데이터를 출력
    console.log(data);
});

//먼저 실행되게 됨 - 파일을 읽어오는 도중 실행됨
console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청했음');