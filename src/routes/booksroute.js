const express = require('express'); 
const booksRouter = express.Router();
// const books = require('../data/books');
const bookdata = require('../model/BookModel');


function routes(nav){

//router to render books page
booksRouter.get('/',async function(req,res){

   await bookdata.find() 
    .then(function (books) {

    res.render('books',{
        books,
        nav
    });

    })
})



//router to render addbook page
booksRouter.get('/addbook',function(req,res){
    res.render('addbook',{nav});

});




//router to add book
booksRouter.post('/add', function (req, res) {

        var item={
            title:req.body.title,
            author:req.body.author,
            image:req.body.image,
            about:req.body.about
        }
        console.log(item)  ;
        const book = new bookdata(item);
        book.save();
        res.redirect('/books');

    })



//router for singlebook
booksRouter.get('/:id',async function(req,res){
    const id = req.params.id;
   await bookdata.findOne({ _id: id })
            .then(function (book) {
                res.render('book', {
                    book,
                    nav
                })

            })
    
});




//router to delete book
booksRouter.post('/delete', async function (req, res) {

    const id = req.body.id;  

 await bookdata.findOneAndDelete({ _id: id })
        .then(function () {

            res.redirect('/books')

        })  
})



//router to edit book
booksRouter.post('/edit', async function (req, res) {

 await bookdata.findById(req.body.id, function(err, data){
        if (err) {
            throw err;
        }
        else {
            res.render('editbook', {data,nav})
        }
    })
})



//router to update book
booksRouter.post('/update', async function (req, res) {

await bookdata.findByIdAndUpdate(req.body.id, { $set: req.body }, function (err, data) {
        if (err) {
            res.json({ status: "Failed" });
        }
        else if (data.n == 0) {
            res.json({ status: "No match Found" });
        }
        else {
            res.redirect("/books");
        }

    }) 
})

    return booksRouter
}




module.exports = routes;