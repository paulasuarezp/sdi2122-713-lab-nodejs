const {ObjectId} = require("mongodb");
module.exports = function (app, commentsRepository) {

    app.post('/comments/:song_id', function (req, res){
        if(req.session.user == null || typeof (req.session.user) == "undefined"){
            res.send("Para añadir un comentario debe iniciar sesión.");
            return;
        }
        let comment = {
            author: req.session.user,
            text: req.body.text,
            song_id: ObjectId(req.params.song_id)
        }

        commentsRepository.addComment(comment, function(commentId){
            if(commentId == null){
                res.send("Error al insertar el comentario");
            } else {
                res.send("Agregado el comentario ID: " + commentId);
            }
        });

    });
};