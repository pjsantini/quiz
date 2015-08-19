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
        res.render('quizes/index.ejs', {quizes: quizes, errors: []});
    });
};

// GET /quizes/:quizId(\\d+)
exports.show = function (req, res) {
    models.Quiz.findAll().success(function(quiz) {
        res.render('quizes/question', {quiz: req.quiz, errors: []});
    });
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function (req, res) {
    models.Quiz.findAll().success(function(quiz) {
        var resultado = "Incorrecto";
        if (req.query.respuesta === req.quiz.respuesta) {
            resultado = "Correcto";
        }
        res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
    });
};

exports.new = function (req, res) {
    var quiz = models.Quiz.build(
        {
            pregunta: "",
            respuesta: "",
            tema: ""
        }
    );
    res.render('quizes/new', {quiz: quiz, errors: []});
}

exports.create = function (req, res) {
    var quiz = models.Quiz.build( req.body.quiz);

    quiz.validate().then(
        function(err) {
            if (err) {
                res.render('quizes/new' , {quiz: quiz, errors: err.errors});
            } else {
                quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
                    res.redirect('/quizes');
                });
            }
        }
    );
};
// GET /quizes/:id/edit
exports.edit = function(req, res) {
    var quiz = req.quiz;
    res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;

    req.quiz.validate().then(
        function(err) {
            if (err) {
                res.render('quizes/edit' , {quiz: req.quiz, errors: err.errors});
            } else {
                req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
                    res.redirect('/quizes');
                });
            }
        }
    ).catch(function(error){next(error)});
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
    req.quiz.destroy().then( function() {
        res.redirect('/quizes');
    }).catch(function(error){next(error)});
};