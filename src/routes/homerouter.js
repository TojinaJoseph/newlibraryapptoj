const express = require('express'); 
const homeRouter = express.Router();
function routes(nav){

    homeRouter.get('/',function(req,res){

        res.render('home',{
            nav
        });
        
    })

    return homeRouter
}








module.exports = routes;