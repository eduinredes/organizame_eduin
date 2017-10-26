var datasource = require('./../server/datasource');

function getAll(req, res, callback) {

    datasource.pool.getConnection(function (err, connection) {

        if (err) {
            callback(err, { "code": 100, "status": "Error in connection database" })
        }

        connection.query('SELECT * FROM documento', function (error, results, fields) {
            callback(error, results, fields)

        });

        connection.on('error', function (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
            return;
        });
    });


}

function getById(id, callback) {

    datasource.pool.getConnection(function (err, connection) {

        if (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
        }

        connection.query('SELECT * FROM documento WHERE documento_id =?', [id], function (error, results, fields) {
            callback(error, results, fields)

        });

        connection.on('error', function (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
            return;
        });
    });


}

function deleteById(id, callback) {

    datasource.pool.getConnection(function (err, connection) {

        if (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
        }

        connection.query('DELETE FROM documento WHERE documento_id =?', [id], function (error, results, fields) {
            callback(error, results, fields)

        });

        connection.on('error', function (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
            return;
        });
    });


}

function update(element, callback) {

    datasource.pool.getConnection(function (err, connection) {

        if (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
        }

        connection.query('UPDATE documento SET folio = ?,  nombre_comprador=?, total=? WHERE documento_id =?', [element.folio,element.nombre_comprador,element.total,element.documento_id], function (error, results, fields) {
            callback(error, results, fields)

        });

        connection.on('error', function (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
            return;
        });
    });


}

function create(document, callback) {
    var fecha = new Date();
    var documento = {
        fecha :fecha,
        folio : document.folio,
        nombre_comprador: document.nombre_comprador ,
        total : document.total

    }
        datasource.pool.getConnection(function (err, connection) {
    
            if (err) {
                callback(err, { "code": 100, "message": "Error in connection database" })
            }
    
            connection.query('INSERT INTO documento SET ?',documento, function  (error, results, fields) {
                callback(error, results, fields)
    
            });
    
            connection.on('error', function (err) {
                callback(err, { "code": 100, "message": "Error in connection database" })
                return;
            });
        });
    
    
    }
exports.document = {
    getAll: getAll,
    getById : getById,
    update:update,
    deleteById:deleteById,
    create : create

}