var util = require('util'); //util 모듈 불러옴
//EventEmitter는 events모듈 안에 정의되어 있으므로 events모듈을 불러들인 후 그 안에 속성으로 들어 있는 EventEmitter 객체를 참조함
var EventEmitter = require('events').EventEmitter; 

//function을 사용해 프로토타입 객체로 만들었으며, this를 통해 자기 자신을 가리킬 수 있으며 그 객체 안에 정의된 속성에 접근할 수 있음
var Calc = function(){
    var self = this;

    //stop이라는 이벤트가 들어왔을 때 리스너 실행됨
    this.on('stop', function(){
        console.log('Calc에 stop event 전달됨');
    });
};

//Calc 객체가 EventEmitter를 상속하도록 만들었음
util.inherits(Calc, EventEmitter);

//프로토타입 객체의 속성으로 add 함수를 추가하면 new 연산자를 이용해 Clac 객체의 인스턴스 객체를 만들었을 때 add() 함수를 사용 가능함
Calc.prototype.add = function(a, b){
    return a+b;
}

//모듈을 불러들이는 쪽에서 Calc 객체를 참조할 수 있도록 module.exports에 Clac 객체를 지정함
module.exports = Calc;
//title 속성값으로 calculator라는 이름 설정
module.exports.title = 'calculator';