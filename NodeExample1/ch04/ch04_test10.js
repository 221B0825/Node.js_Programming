// 버퍼 객체를 크기만 지정하여 만든 후 문자열을 씀
var output = '안녕 1!';
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf-8');
console.log('첫 번째 버퍼의 문자열: '+buffer1.toString());

//버퍼 객체를 문자열을 이용해 만듦
var buffer2 = new Buffer('안녕 2!','utf-8');
console.log('두 번째 버퍼의 문자열 : '+buffer2.toString());

//타입을 확인
console.log('버퍼 객체의 타입: '+Buffer.isBuffer(buffer1));

//버퍼 객체에 들어 있는 문자열 데이터를 문자열 변수로 만듦
var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf-8', 0 ,byteLen);
var str2 = buffer2.toString('utf-8');

//첫 번째 버퍼의 객체의 문자열을 두 번째 버퍼 객체로 복사함
buffer1.copy(buffer2, 0, 0, len);
console.log('두 번째 버퍼에 복사한 후의 문자열: '+buffer2.toString('utf-8'));

//두 개의 버퍼를 붙여줌
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('두 개의 버퍼를 붙인 후의 문자열: '+buffer3.toString('utf-8'));