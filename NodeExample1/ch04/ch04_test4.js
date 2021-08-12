var Calc = require('./calc3'); //calc3.js파일 불러옴

var calc = new Calc(); //new를 통해 인스턴스 객체를 생성함
calc.emit('stop'); //stop이라는 이벤트를 전달함

console.log(Calc.title+'에 stop 이벤트 전달함');
