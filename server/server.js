var express = require('express'),
    expressApp = express(),
    http = require('http'),
    mysql = require('mysql'),
    User = require('./../models/user');
Documents = require('./../models/document'),
    Detail = require('./../models/detail'),
    bodyParser = require('body-parser');

expressApp.use(express.static(__dirname + '/../public/'));
expressApp.set('views', './../public/app/views')
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(expressApp);

exports.run = function (config) {



    var router = express.Router();

    //route to handle user registration

    router.post('/login', User.user.login)

    router.get('/document', function (req, res) {
        Documents.document.getAll(req, res, function (error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "message": "error ocurred"
                })
            } else {
                console.log('The solution is: ', results);
                res.send(results);
            }
        })
    })

    router.get('/document/:id', function (req, res) {
        var id = req.params.id;

        Documents.document.getById(id, function (error, element, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "message": "error ocurred"
                })
            } else {
                console.log("document element", element[0])
                Detail.detail.getListByDocumentId(element[0].documento_id, function (error, results, fields) {
                    if (error) {
                        errores.push(error)
                        console.log(error)
                    } else {
                        element[0].detalles = results;
                    }
                    console.log('The solution is: ', element,results);
                    res.send(element);
                });

            }
        })
    })


    router.delete('/document/:id', function (req, res) {
        var id = req.params.id;

        Documents.document.deleteById(id, function (error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "message": "error ocurred"
                })
            } else {

                res.send(results);
            }
        })
    })

    router.post('/document/:id?', function (req, res) {
        var element = req.body;
        var id = req.params.id;
        element.total = 0;
        element.detalles.forEach(function (item) {
            element.total+=item.subtotal;
        })
        if (id) {
            element.documento_id = id;
            Documents.document.update(element, function (error, results, fields) {
                if (error) {
                    console.log("error ocurred", error);
                    res.send({
                        "code": 400,
                        "message": "error ocurred"
                    })
                } else {
                    var errores = []
                    
                    element.detalles.forEach(function (item,idx,array) {

                        item.documento_id = parseInt(id);
                        if (item.documento_detalle_id) {
                            Detail.detail.update(item, function (error, resultados, fields) {
                                if (error) {
                                    errores.push(error)
                                }
                                
                                
                                if (idx == array.length - 1) {
                                    res.send({
                                        "code": 200,
                                        "data": resultados,
                                        "errors": errores
                                    });
                                    return;
                                }
                            });
                        } else {
                            console.log("item create ",item)
                            Detail.detail.create(item, function (error, results, fields) {
                                if (error) {
                                    errores.push(error)
                                }
                               
                                if (idx == array.length - 1) {
                                    res.send({
                                        "code": 200,
                                        "data": results,
                                        "errors": errores
                                    });
                                }
                            });
                        }
                       
                    }, this);
                    console.log('updated ', results);

                }
            })
        } else {
            Documents.document.create(element, function (error, results, fields) {
                if (error) {
                    console.log("error ocurred", error);
                    res.send({
                        "code": 400,
                        "message": "error ocurred"
                    })
                } else {
                    var errores = []
                    var i = 1
                    element.detalles.forEach(function (item,idx,array) {
                        item.documento_id = results.insertId;


                        Detail.detail.create(item, function (error, results, fields) {
                            if (error) {
                                errores.push(error)
                            }
                          
                            if (idx == array.length - 1) {
                                res.send({
                                    "code": 200,
                                    "data": results,
                                    "errors": errores
                                });
                            }
                        });
                        i++;
                    }, this);

                    console.log('created ', results, error, fields);

                }
            })
        }
    })


    var router2 = express.Router();

    // test route
    router2.get('/', function (req, res) {
        res.sendFile('index.html', { root: __dirname + '/../public/app/views/' });
    });

    expressApp.use('/api', router);
    expressApp.use('/', router2);

    server.listen(config.PORT);
    console.log('Listening on', config.PORT);

};

