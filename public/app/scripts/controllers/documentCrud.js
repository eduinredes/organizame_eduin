'use strict';

/**
 * 
 */
angular.module('organizameApp')
    .controller('DocumentCrudCtrl', ['$routeParams', "$scope", "$route", "documentServ", function ($routeParams, $scope, $route, documentServ) {
        $scope.$route = $route;
        var documentsCrud = this;
        documentsCrud.documents = [];

        documentsCrud.deleteDoc = deleteDoc
        documentsCrud.print = print
        ////////////////////////////
        updateTable()

        function deleteDoc(id) {
            var resp = documentServ.delete(id);
            resp.then(function (data) {
                updateTable()

            }).catch(function (err) {
                alert("errorejecutar operación")
            });

        }


        function updateTable() {
            var respo = documentServ.getAll();
            respo.then(function (data) {
                documentsCrud.documents = data;
            }).catch(function (err) {
                alert("error al obtener datos")
            });
        }

        //TODO evitar que bloqueadores de publicidad bloqueen la ventana emergente 
        function print(id) {
            var respo = documentServ.getById(id);
            respo.then(function (data) {
                
                var document = data[0];

                var doc = new PDFDocument();
                var stream = doc.pipe(blobStream());
                var textwrite = {
                    width: 412,
                    align: 'justify',
                    indent: 30,
                    columns: 1,
                    height: 300,
                    ellipsis: true
                };
                // draw some text
                doc.fontSize(25)
                    .text('Detalles de la compra', 100, 80);



                // and some justified text wrapped into columns
                doc.moveTo(100, 100)
                    .font('Times-Roman', 14)
                    .moveDown()
                    .text("Folio :   "+document.folio, textwrite)
                    .text("Nombre del comprador :    "+document.nombre_comprador, textwrite)
                    .text("Total :   "+document.total, textwrite)
                    .moveDown().fontSize(16)
                    .text("Lineas del pedido", textwrite);
                    document.detalles.forEach(function(item,index){
                        doc.moveDown().fontSize(14)
                        .text("#"+(index+1), textwrite)
                        .text("Unidad de medida :   "+item.unidad_medida, textwrite)
                        .text("Precio :   "+item.precio, textwrite)
                        .text("Cantidad :   "+item.cantidad, textwrite)
                        .text("Descripción :   "+item.descripcion, textwrite)
                        .text("Subtotal :   "+item.subtotal, textwrite);
                    })

                    

                // end and display the document in the iframe to the right
                doc.end();
                stream.on('finish', function () {
                    var url = stream.toBlobURL('application/pdf');
                    window.open(url);
                });
            }).catch(function (err) {
                alert("error al obtener datos")
            });
        }
    }]);
