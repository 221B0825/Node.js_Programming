var express = require('express');
var http = require('http');
var path = require('path');

//Express의 미들웨어 불러오기
var bodyParser = require('body-parser'),
    static = require('serve-static');

var expressErrorHandler = require('express-error-handler');

//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname,'public')));

//라우터 객체 참조
var router = express.Router();



router.route('/process/login').post(function(req, res){
    console.log('/process/login 처리함');

    var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
	res.end();
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
      '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//http://127.0.0.1:3000/public/login
