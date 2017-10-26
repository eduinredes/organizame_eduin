var datasource = require('./../server/datasource');

function login(req, res) {
    console.log(req.body)
    var username = req.body.username;
    var password = req.body.password;

    datasource.pool.getConnection(function (err, connection) {
        if (checkError(err, res)) {
            return;
        }

        connection.query('SELECT * FROM usuario WHERE username = ?', [username], function (error, results, fields) {
            if (error) {
                res.status(400);
                res.send({
                    "code": 400,
                    "message": "error ocurred"
                })
            } else {

                if (results.length > 0) {
                    if (results[0].password == password) {
                        res.send({
                            "code": 200,
                            "message": "login sucessfull"
                        });
                    }
                    else {
                        res.status(404);
                        res.send({
                            "code": 204,
                            "message": "Datos no coinciden "
                        });
                    }
                }
                else {
                    res.status(404);
                    res.send({
                        "code": 204,
                        "message": "Usuario no existe"
                    });
                }
            }
        });

        onError(err, res,connection)
    });


}


function checkError(err, res) {
    if (err) {
        console.log(err)
        res.json({ "code": 100, "message": "Error en conectar con la base de datos" });
        return true;
    } else {
        return false;
    }
}

function onError(err, res,connection) {
    connection.on('error', function (err) {
        console.log(err)
        res.json({ "code": 100, "message": "Error en conectar con la base de datos" });
        return;
    });
}

exports.user = {
    login: login
}