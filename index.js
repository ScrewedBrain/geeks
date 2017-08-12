const express = require('express')
const app = express()
const pug = require('pug')
var fs = require('fs')

var compression = require('compression')
var loadJson = function(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
    callback(JSON.parse(data))
});
}

app.set('views', './views')
app.use(compression())
app.use(express.static('public'))
app.set('view engine', 'pug')

const logReq = function(req) {
    var logFile = ["./log/", new Date(), ".txt"].join("");
    var text = [JSON.stringify(req.headers), "\n\n\n\n", JSON.stringify(req.body)].join("");
    console.log(req.headers);
    console.log(req.body);
    fs.writeFile(logFile, text, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

const resLang = function(lang, template, res, dict) {
    var file = ['./',dict, '-', lang, '.json'].join('')
        loadJson(file, function(data) {
        res.render(template, data) })
}

const sLAR = function(req,res,template,dict) {
    if (req.query.lang == undefined) {
        if (!req.headers["accept-language"]) {
            return
        }
        var langs = req.headers["accept-language"].split(',')
    if (langs[0] == 'ru-RU' || langs[0] == 'ru') {
        resLang('ru', template, res, dict)
    
    } else {
        resLang('en', template, res, dict)
    }
    } else {
        if (req.query.lang == 'ru') {
            resLang('ru', template, res, dict)
        } else {
            resLang('en', template, res, dict)
        }
    }
}

app.get('/', function (req, res) {logReq(req); 
   sLAR(req,res,'index','home')
})

app.get('/home-mobile', function (req, res) {
    sLAR(req,res,'home-mobile','home')
})

app.get('/home1', function (req, res) {
    sLAR(req,res,'home1','home')
})


app.listen(9677, function () {
    console.log('Example app listening on port 9677!')
})
