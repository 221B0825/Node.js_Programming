var express = require('express');
var http = require('http');
var path = require('path');

//Express의 미들웨어 불러오기
var bodyParser = require('body-parser'),
    static = require('serve-static');

var expressErrorHandler = require('express-error-handler');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname,'public')));

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave: true,
    saveUninitialized: true
}));

//라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/login').post(function(req, res){
    console.log('/process/login 호출됨');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if(req.session.user){
        //이미 로그인된 상태
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');

        res.redirect('/public/product.html');
    }else{
        //세션 저장
        req.session.user = {
            id: paramId,
            name: '이름',
            authorized: true
        };

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : ' + paramId + '</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        res.write("<br><br><a href='/process/product'>상품 페이지로 이동</a>");
        res.end();
    }
});

//로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route('/process/logout').get(function(req, res){
    console.log('/process/logout 호출됨');

    if(req.session.user){
        console.log('로그아웃합니다.');

        req.session.destroy(function(err){
            if(err) {throw err;}

            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/public/login2.html');
        });
    }else{
        //로그인 안된 상태
        console.log('로그인되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
});

// 상품정보 라우팅 함수
router.route('/process/product').get(function(req, res){
    console.log('/process/product 호출됨');

    if(req.session.user){
        res.redirect('/public/product.html');
    }else{
        res.redirect('/public/login2.html');
    }
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

//http://127.0.0.1:3000/process/product
