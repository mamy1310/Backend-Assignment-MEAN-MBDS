let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    const aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 30,
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            if (req.query.rendu !== undefined) {
                const a = assignments;
                a.docs = assignments.docs.filter(assignment => assignment.rendu === (req.query.rendu === 'true'));
                res.send(a);
                return;
            }
            res.send(assignments);
        }
    );
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

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
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

function search(req, res) {
    Assignment.find(constructFindQuery(req), (err, assignment) => {
        if(err){
            res.send(err)
        }

        res.send(assignment);
    });
}

function constructFindQuery(req) {
    const query = {};
    if (req.query.dateDeRenduMax) {
        query.dateDeRendu = { $lte: req.query.dateDeRenduMax };
    }
    if (req.query.nom) {
        query.nom = "/.*"+req.query.nom+".*/i";
    }
    return query;
}



module.exports = { getAssignments, search, postAssignment, getAssignment, updateAssignment, deleteAssignment };
