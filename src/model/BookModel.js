const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tojina:tojina@ictakfiles.j3i0k.mongodb.net/libraryDatabase?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});
const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title : String,
    author: String,
    image: String,
    about: String
});

const bookdata = mongoose.model('bookdata',BookSchema);

module.exports = bookdata;