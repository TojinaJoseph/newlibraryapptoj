const express = require('express'); 
const path = require ('path'); 
const cors = require('cors');
const bodyParser=require('body-parser');//changed(2)
const nav= [
    {
        link:"/books",
        title:"Books"
    },
    {
        link:"/authors",
        title:"Authors"
    },
    {
        link:"/books/addbook",  //changed
        title:"Add Book"
    },
    {
        link:"/authors/addauthor", //changed
        title:"Add Author"
    }
]

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter')(nav);//changed(3) (6)
const booksRouter = require('./src/routes/booksroute')(nav);//changed (6)
const authorsRouter = require('./src/routes/authorsroute')(nav);//changed(6)

const app = new express;  


app.set('views','./src/views'); 
app.set('view engine','ejs'); 

app.use(cors());//changed new(7)
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname , '/public'))); 

app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 



app.get('/',function(req,res){

    res.render('index',{});
    
});





app.listen(5000,()=>{
    console.log("Server Ready on 5000");//changed(5)
});