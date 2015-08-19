var express = require('express');
var router = express.Router();

var quiz_controller = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos de :quizId
router.param('quizId', quiz_controller.load);

router.get('/quizes', quiz_controller.index);
router.get('/quizes/:quizId(\\d+)', quiz_controller.show);
router.get('/quizes/:quizId(\\d+)/answer', quiz_controller.answer);
router.get('/quizes/new', quiz_controller.new);
router.post('/quizes/create', quiz_controller.create);
router.get('/quizes/:quizId(\\d+)/edit', quiz_controller.edit);
router.put('/quizes/:quizId(\\d+)', quiz_controller.update);
router.delete('/quizes/:quizId(\\d+)', quiz_controller.destroy);


module.exports = router;
