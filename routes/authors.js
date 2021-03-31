const express=require('express')
const router = express.Router()
const Author= require('../models/author')

router.get('/', async (req,res)=>{
    let search={}
    if(req.query.name!=null&&req.query.name!==''){
        search.name=new RegExp(req.query.name,'i')
    }
    try{
        const authors=await Author.find(search)
        res.render('authors/index',{
            authors:authors,
            search:req.query
        })
    }catch{
        res.redirect('/')
    }
    
})
router.get('/new', (req,res)=>{
    res.render('authors/new',{author: new Author()})
})
router.post('/', async (req,res)=>{
    const author=new Author({
        name:req.body.name
    })
    try{
        const newAuthor=await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch{
        res.render('authors/new',{
            author: author,
            errorMessage: 'erro creating Author' 
        })
    }
    
    
}) 

module.exports= router