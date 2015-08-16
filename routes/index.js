var express = require('express');
var router = express.Router();

var quiz_controller = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos de :quizId
router.param('quizId', quiz_controller.load);

router.get('/quizes', quiz_controller.index);
router.get('/quizes/:quizId(\\d+)', quiz_controller.show);
router.get('/quizes/:quizId(\\d+)/answer', quiz_controller.answer);

module.exports = router;
