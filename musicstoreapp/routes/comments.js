const {ObjectId} = require("mongodb");
module.exports = function (app, commentsRepository) {

    app.post('/comments/:song_id', function (req, res){
        // Esto lo tenía porque el enunciado pide "se mostrará un mensaje cualquiera de error con res.send()" --> mejor hacer la comprobación en app.js
        // if(req.session.user == null || typeof (req.session.user) == "undefined"){
        //    res.send("Para añadir un comentario debe iniciar sesión.");
        // } else {
            let songId = ObjectId(req.params.song_id);

            if(typeof(req.body.text) == "undefined"
                || req.body.text.toString().trim().length == 0
                || req.body.text == null){

                res.send("El comentario no puede estar vacío");

            } else {
                let comment = {
                    author: req.session.user,
                    text: req.body.text,
                    song_id: songId
                }

                commentsRepository.addComment(comment, function (commentId) {
                    if (commentId == null) {
                        res.send("Error al insertar el comentario");
                    } else {
                        res.send("Agregado el comentario ID: " + commentId);
                    }
                });
            }
       // }
    });
};