const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tojina:tojina@ictakfiles.j3i0k.mongodb.net/libraryDatabase?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});
const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
    title : String,
    image: String,
    about: String
});

const authordata = mongoose.model('authordata',AuthorSchema);

module.exports = authordata;