let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    const aggregateQuery = Assignment.aggregate([{ $match: { nom: { $regex: '.*' + req.query.search + '.*' },rendu:(req.query.rendu === 'true')  } }]);
    Assignment.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 30,
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
           /* if (req.query.rendu !== undefined) {
                const a = assignments;
                a.docs = assignments.docs.filter(assignment => assignment.rendu === (req.query.rendu === 'true'));
                res.send(a);
                return;
            }*/
            res.send(assignments);
        }
    );

    /*Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });*/
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.note = req.body.note;
    assignment.matiere=req.body.matiere;
    assignment.remarque=req.body.remarque;

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} enregistré!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    var note = req.body.note;
    var rendu = req.body.rendu;
    var matiere = req.body.matiere;
    var nom = req.body.nom;
    var dateDeRendu = req.body.dateDeRendu;
    console.log(note);
    console.log(rendu);
    console.log(nom);
    console.log(matiere);
    console.log(dateDeRendu);
    if(nom == null||nom == undefined||nom==""){
        res.status(403).send({message:"Nom doit être renseigne"});
        return;
    }
    if(matiere == null||matiere == undefined||matiere==""){
        res.status(403).send({message:"Vous devez choisir une matiere"});
        return;
    }
    if(dateDeRendu == null||dateDeRendu == undefined||dateDeRendu==""){
        res.status(403).send({message:"Vous devez choisir une date de rendu"});
        return;
    }


    if(note<0 || note>20){
        res.status(403).send({message:"Note doit être valide"});
        return;
    }
    if(!rendu){
        req.body.note = null;
        req.body.remarque = '';
        
    }else{
        if(note == null||note == undefined||note==""){
            res.status(403).send({message:"Note doit être saisie avant d'être rendu"});
            return;
        }
    }
  
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

       console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
