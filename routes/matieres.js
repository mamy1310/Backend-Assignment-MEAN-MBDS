const Matiere = require("../model/matiere")

// récuperer toutes les matieres
function getMatieres(req, res){
    Matiere.find((err, matieres) => {
        if(err){
            res.send(err)
        }

        res.send(matieres);
    });
}

module.exports = { getMatieres };
