/**
 * Created by Pablo on 13/08/2015.
 */

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var passwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, passwd,
                        {
                            dialect: dialect,
                            protocol : protocol,
                            port: port,
                            host: host,
                            storage: storage,
                            omitNull: true
                        }
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
                            respuesta: 'Roma',
                            tema: 'ciencia'
            });
            Quiz.create({   pregunta: 'Capital de Portugal',
                            respuesta: 'Lisboa',
                            tema: 'ciencia'
            })
            .then(function() {
                console.log('Base de Datos Inicializada')
            });
        };
    });
});
