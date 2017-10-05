var moodleService = require('../services/moodleService');

module.exports = function(express) {

    var router = express.Router();

    findAllMoodleCourses = function(req, res){

        moodleService.findAllCourses(function(courses, err){
            if(err){
                console.error('Error al recuperar los usuarios');
                res.send({
                    message: 'Se ha producido un error. Contacte con el administrador.',
                    error: null
                });
            }else{
                console.log('Cursos obtenidos:', courses);
                res.send({courses: courses});
            }
        });
    };

    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });

    router.get('/courses', findAllMoodleCourses);

    return router;
};

