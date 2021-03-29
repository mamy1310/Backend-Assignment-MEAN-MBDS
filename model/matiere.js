var mongoose = require('mongoose');
var MatiereSchema = new mongoose.Schema({
    id: Number,
    nom: String,
    image: String,
    nom_prof: String,
    image_prof: String
});
mongoose.model('Matiere', MatiereSchema);

module.exports = mongoose.model('Matiere');
