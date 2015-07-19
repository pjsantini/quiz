/**
 * Created by Pablo on 19/07/2015.
 */


// GET /quizes/question
exports.question = function (req, res) {
    res.render('quizes/question', {pregunta: 'Capital de Venezuela'});
};

// GET /quizes/answer
exports.answer = function (req, res) {
    if (req.query.respuesta === 'Caracas') {
        res.render('quizes/answer', {respuesta: 'Correcta'});
    } else {
        res.render('quizes/answer', {respuesta: 'Incorrecta'});
    }
};