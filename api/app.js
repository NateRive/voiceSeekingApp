var express = require('express')
var app = express();

const convert = require('./router/convert')
// const clientRequest = require('./router/clientRequest')

var servver = app.listen(3000, function() {
    console.log("Node.js is listening on port" + servver.address().port)
})

app.use(express.static(__dirname + '/public'));
app.use('/convert', convert);

// login画面のページを返すAPI (静的ファイルとして処理)

// login後の画面を返すAPI pugテンプレートエンジンを使用

// folder一覧API
// app.use('/folder/', clientRequest)

// １つのfolderに紐付くfileを返すAPI

//  クリックされたfileのスクリプトと時間オフセットを返すAPI