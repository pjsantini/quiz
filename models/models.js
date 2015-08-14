/**
 * Created by Pablo on 13/08/2015.
 */

var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BD SQLite
var sequelize = new Sequelize(null, null, null,
                        {dialect: "sqlite", storage: "quiz.sqlite"}
                    );
//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
// Exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

//sequilize.sync() crea e inicializa la tabla de quizes en DB
sequelize.sync().success(function() {
    //success ejecuta al manejador una vez creada la tabla
    Quiz.count().success(function(count) {
        if (count === 0) {
            Quiz.create({   pregunta: 'Capital de Italia',
                            respuesta: 'Roma'
            })
            .success(function() {
                console.log('Base de Datos Inicializada')
            });
        };
    });
});
