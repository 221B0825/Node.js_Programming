//Express 기본 모듈 불러오기
var express = require('express'),
    http = require('http'),
    path = require('path');

//Express의 미들웨어 불러오기
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler');

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

//Session 미들웨어 불러오기
var expressSession = require('express-session');

//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000);

//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.json());

//public 폴더를 static으로 오픈
app.use('./public', static(path.join(__dirname,'public')));

//cookie-parser 설정
app.use(cookieParser());

//세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

