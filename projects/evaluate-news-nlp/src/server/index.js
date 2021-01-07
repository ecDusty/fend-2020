const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const mockAPIResponse = require('./mockAPI.js');
const cors = require('cors');

const app = express();
const config = require('../../webpack.dev.js');
const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

app.use(cors());

app.use(express.static('dist'));

// console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'));
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})

app.get('/test', function (req, res) {
    const response = require('./mockAPI.js');
    console.log(response);
    console.log('API get with test===========');
    res.send(response)
})
