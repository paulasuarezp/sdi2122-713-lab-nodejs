module.exports = function (app) {

    app.get("/authors", function (req, res) {
        let authors = [{
            "name": "Taylor Swift",
            "group": "Sin grupo",
            "role": "Cantante"
        },{
            "name": "Wiz Khalifa",
            "group": "Sin grupo",
            "role": "Cantante"
        }, {
            "name": "Bruno Mars",
            "group": "Sin grupo",
            "role": "Cantante"
        }];

        let response = {
            seller: 'Tienda de canciones',
            authors: authors
        }

        res.render("authors/authors.twig", response);
    });

    app.get('/authors/add', function (req, res) {
        res.render("authors/add.twig");
    });

    app.get('/authors/:id', function(req, res) {
        let response = 'id: ' + req.params.id + '<br>';
        res.send(response);
    });

    app.post('/authors/add', function (req, res){

        if(req.body.name != null && req.body.name.length!=0 && typeof(req.body.name) != "undefined") {
            if (req.body.group != null && req.body.group.length!=0 && typeof(req.body.group) != "undefined") {
                let response = "Autor agregado: " + req.body.name + "<br>"
                    + "Grupo: " + req.body.group + "<br>"
                    + " Rol: " + req.body.role;

                res.send(response);
            }
            else
                res.send("Parámetro \"grupo\" no enviado en la petición");
        }
        else
            res.send("Parámetro \"nombre\" no enviado en la petición");
    });

    app.get('/authors/*', function (req, res) {
        res.redirect("/authors");
    });
};