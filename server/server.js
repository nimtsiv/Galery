var express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var db = require('./db');
var upload = require('express-fileupload');
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //парсить дані форми
app.use(express.static('client'));
app.use(upload());
app.use(express.static('ico'));





//db.coll.find(queryDoc).skip(x).limit(y)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => {
    fs.readFile('../Api_app/client/index.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
        res.write(data);
        res.end();
    });
})
app.get('/Galery', (req, res) => {
    db.get().collection('Galery').find().sort({_id: 1}).skip(parseInt(req.query.skip)).limit(30).toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.send(500);
        }
        res.send(docs);
    })
})

app.post('/Galery', (req, res) => {
    // console.log(req.files);
    // console.log(req.headers);
    console.log(req.headers);
    var record = {
        photoLabel: req.headers.photolabel,
        category: req.headers.category,
        srcPhoto: "images/portfolio_mansory/"+req.files.file.name
    };

    if (req.files) {
        let file = req.files.file;
        console.log(file.name);
        let filename = file.name;
        file.mv("./client/images/portfolio_mansory/" + filename, (err) => {
            if (err) {
                console.log(err);
                res.send("error occured");
            }
            else {
                db.get().collection('Galery').find({"srcPhoto": record.srcPhoto}).toArray((err, docs) => {
                    if (err) {
                        console.log(err);
                        return res.send(500);
                    }
                    if (docs.length) {
                        //console.log('question exist');
                        res.send('Запис вже існує');
                    } else {
                        db.get().collection('Galery').insert(record, (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(500);
                            }
                            res.send('Запис додано');
                        })
                    }
                })
            }
        })

    }


})


app.put('/Galery/:id', (req, res) => {
    console.log(req.body);
    db.get().collection('Galery').updateOne(
        {_id: ObjectID(req.params.id)},
        {
            photoLabel: req.body.photoLabel,
            category: req.body.category,
            srcPhoto: req.body.srcPhoto
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send(500);
            }
            res.sendStatus(200);
        }
    )
})

app.delete('/Galery/:id', (req, res) => {
    db.get().collection('Galery').deleteOne(
        {_id: ObjectID(req.params.id)},
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send(500);
            }
            res.sendStatus(200);
        }
    )

})
let url = '';
db.connect("mongodb://AnyUser2:qweasd123zxc@kramarow-shard-00-00-f7c0f.mongodb.net:27017,kramarow-shard-00-01-f7c0f.mongodb.net:27017,kramarow-shard-00-02-f7c0f.mongodb.net:27017/test?ssl=true&replicaSet=Kramarow-shard-0&authSource=admin&retryWrites=true", (err) => {
    if (err) {
        return console.log(err);
    }
    app.listen(8080, () => {
        console.log('app is running port 8080');
    })

})

app.get('/portfolio', (req, res) => {
    fs.readFile('../Api_app/client/portfolio_mansory_v1 - Copy.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
        res.write(data);
        res.end();
    });
})

app.get('/changeData', (req, res) => {
    fs.readFile('../Api_app/client/changeData.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
        res.write(data);
        res.end();
    });
})



