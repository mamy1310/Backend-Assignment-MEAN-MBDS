let mongoose = require('mongoose');
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;
let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    note: Number,
    matiere: Schema.Types.Mixed
});
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
