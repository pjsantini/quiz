/**
 * Created by Pablo on 19/07/2015.
 */

var models = require('../models/models.js');

// LOAD
exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId).then(
        function(quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next (new Error('No existe quizId=' + quizId));
            }
        }
    ).catch(function(error) {
            next(error);
        });
};

// GET /quizes
exports.index = function (req, res) {
    var search = '%';
    if (req.query.search) {
        search = search + req.query.search.replace(' ', '%') + '%';
    }
    console.log("search: " + search)
    models.Quiz.findAll({where: ["pregunta like ?", search]}).success(function(quizes) {
        res.render('quizes/index.ejs', {quizes: quizes});
    });
};

// GET /quizes/:quizId(\\d+)
exports.show = function (req, res) {
    models.Quiz.findAll().success(function(quiz) {
        res.render('quizes/question', {quiz: req.quiz});
    });
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function (req, res) {
    models.Quiz.findAll().success(function(quiz) {
        var resultado = "Incorrecto";
        if (req.query.respuesta === req.quiz.respuesta) {
            resultado = "Correcto";
        }
        res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
    });
};
