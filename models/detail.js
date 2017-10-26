var datasource = require('./../server/datasource');




function update(element, callback) {

    datasource.pool.getConnection(function (err, connection) {

        if (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
        }

        connection.query('UPDATE detalle SET unidad_medida = ?, precio=?, cantidad=?, descripcion=?, subtotal=? WHERE documento_detalle_id =?', [element.unidad_medida, element.precio, element.cantidad, element.descripcion, element.subtotal, element.documento_detalle_id], function (error, results, fields) {
            callback(error, results, fields)

        });

        connection.on('error', function (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
            return;
        });
    });


}

function create(detail, callback) {
    var fecha = new Date();
    var detalle = {
        unidad_medida: detail.unidad_medida,
        precio: detail.precio,
        cantidad: detail.cantidad,
        descripcion: detail.descripcion,
        subtotal: detail.subtotal,
        documento_id : detail.documento_id

    }
    datasource.pool.getConnection(function (err, connection) {

        if (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
        }

        connection.query('INSERT INTO detalle SET ?', detalle, function (error, results, fields) {
            callback(error, results, fields)

        });

        connection.on('error', function (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
            return;
        });
    });


}

function getListByDocumentId(id, callback) {

    datasource.pool.getConnection(function (err, connection) {

        if (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
        }
console.log("el det ide ",id)
        connection.query('SELECT * FROM detalle WHERE documento_id = ?', [id], function (error, results, fields) {
            callback(error, results, fields)

        });

        connection.on('error', function (err) {
            callback(err, { "code": 100, "message": "Error in connection database" })
            return;
        });
    });


}
exports.detail = {
    getListByDocumentId: getListByDocumentId,
    update: update,
    create: create

}