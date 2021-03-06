var express = require('express')
var app = express();
const cors = require('cors')

const speech = require('./router/speech')
const page = require('./router/page')
const word = require('./router/word')
const file = require('./router/file');
const workspace = require('./router/workspace');
const audio = require("./router/audio");
// const clientRequest = require('./router/clientRequest')

var server = app.listen(3000, function () {
  console.log("Node.js is listening on port" + server.address().port)
})
app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use('/api/speech', speech);
app.use('/api/pages', page)
app.use('/api/word', word)
app.use('/api/files', file)
app.use('/api/audios', audio)
app.use('/api/workspaces', workspace)
// login画面のページを返すAPI (静的ファイルとして処理)

// login後の画面を返すAPI pugテンプレートエンジンを使用

// folder一覧API
// app.use('/folder/', clientRequest)

// １つのfolderに紐付くfileを返すAPI

//  クリックされたfileのスクリプトと時間オフセットを返すAPI