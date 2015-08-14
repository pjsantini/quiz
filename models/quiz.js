/**
 * Created by Pablo on 13/08/2015.
 */

module.exports = function(squelize, DataTypes) {
    return squelize.define('Quiz',
        {
            pregunta: DataTypes.STRING,
            respuesta: DataTypes.STRING,
        });
}