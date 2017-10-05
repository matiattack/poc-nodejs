var http = require('http');

var host = 'localhost';
var wsToken = 'd812c4c41b1e772f1c62c1e4d6dc2d23';

exports.findAllCourses = function(next){

    /**
     * Carga de los parámetros genéricos del servicio RESTful
     */
    var options = {
        host: host,
        path: createMoodleUri('core_course_get_courses'),
        port: 80,
        method: 'GET',
        encoding: null
    };

    restCall(options, null, function (users, err) {
        if (err) {
            next(null, err);
        } else {
            next(users, null);
        }
    });
};

/**
 * Función encargada de invocar los servicios RESTful y devolver
 * el objeto JSON correspondiente.
 */
restCall = function(options, jsonObject, next) {

    var req = http.request(options, function(res) {

        var contentType = res.headers['content-type'];
        /**
         * Variable para guardar los datos del servicio RESTfull.
         */
        var data = '';

        res.on('data', function (chunk) {
            // Cada vez que se recojan datos se agregan a la variable
            data += chunk;
        }).on('end', function () {
            // Al terminar de recibir datos los procesamos
            var response = null;

            // Nos aseguramos de que sea tipo JSON antes de convertirlo.
            if (contentType.indexOf('application/json') != -1) {
                response = JSON.parse(data);
            }

            // Invocamos el next con los datos de respuesta
            next(response, null);
        })
            .on('error', function(err) {
                // Si hay errores los sacamos por consola
                console.error('Error al procesar el mensaje: ' + err)
            })
            .on('uncaughtException', function (err) {
                // Si hay alguna excepción no capturada la sacamos por consola
                console.error(err);
            });
    }).on('error', function (err) {
        // Si hay errores los sacamos por consola y le pasamos los errores a next.
        console.error('HTTP request failed: ' + err);
        next(null, err);
    });

    // Si la petición tiene datos estos se envían con la request
    if (jsonObject) {
        req.write(jsonObject);
    }
    req.end();
};

createMoodleUri = function(path){
    return '/proyecto-ingenieria-software/moodle/webservice/rest/server.php?wsfunction=' + path + '&wstoken=' + wsToken + '&moodlewsrestformat=json';
};

