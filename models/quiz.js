/**
 * Created by Pablo on 13/08/2015.
 */

module.exports = function(squelize, DataTypes) {
    return squelize.define('Quiz',
        {
            pregunta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> Falta su pregunta"}}
            },
            respuesta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> Falta su respuesta"}}
            },
            tema: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> Falta el tema"}}
            },
        });
}