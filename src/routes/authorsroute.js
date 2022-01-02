const express = require('express'); 
const authorsRouter = express.Router();
// const authors = require('../data/authors');
const authordata = require('../model/AuthorModel');



//router to render authors page
function routes(nav){
    authorsRouter.get('/',async function(req,res){

       await authordata.find() 
        .then(function (authors) {
    
        res.render('authors',{
            nav,    //changed
            authors
        });
    
        })
    })
    
    
    
    //router to render add author page
    authorsRouter.get('/addauthor',function(req,res){
        res.render('addauthor',{nav});    //changed
    
    });
    
    
    
    
    //router to add author
    authorsRouter.post('/add', function (req, res) {
    
        var item={
            title:req.body.title,
            image:req.body.image,//changed(8)
            about:req.body.about
        }
        console.log(item)  ;
        const author = new authordata(item);
        author.save();
        res.redirect('/authors');
    
    })
    
    
    
    
    //router for single author
    authorsRouter.get('/:id',async function(req,res){
        const id = req.params.id;
       await authordata.findOne({ _id: id })
                .then(function (author) {
                    res.render('author', {
                        author,
                        nav
                    })
    
                })
        
    });
    
    
    
    
    //router to delete author
    authorsRouter.post('/delete',async function (req, res) { //changed(9)
    
        const id = req.body.id;  
    
       await authordata.findOneAndDelete({ _id: id })
            .then(function () {
    
                res.redirect('/authors')
    
            })  
    })
    
    
    
    //router to edit author
    authorsRouter.post('/edit',async function (req, res) {
    
      await  authordata.findById(req.body.id, function(err, data){
            if (err) {
                throw err;
            }
            else {
                res.render('editauthor', {data,nav})//changed
            }
        })
    })
    
    
    
    
    //router to update author
    authorsRouter.post('/update', async function (req, res) {
    
    await authordata.findByIdAndUpdate(req.body.id, { $set: req.body }, function (err, data) {
            if (err) {
                res.json({ status: "Failed" });
            }
            else if (data.n == 0) {
                res.json({ status: "No match Found" });
            }
            else {
                res.redirect("/authors")
            }
    
        })  
    })
    return authorsRouter;
}







module.exports = routes;//changed