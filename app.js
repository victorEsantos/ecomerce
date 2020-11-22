const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require("./routes/admin")
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")
require("./models/Produto")
const Produto = mongoose.model("produtos")
const usuario = require('./routes/usuario')
const passport = require('passport')
require("./config/auth")(passport)
const {conections}= require("./helpers/connec")

//config
    //sessao
    //um app.use() é um middleware
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())

        app.use(flash())
    //middleware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null;
            res.locals.userIsAdm = req.user != undefined && req.user.eAdmin == 1;
            if(req.user != undefined && req.user != null){
                res.locals.userName = req.user.nome;
            }else{
                res.locals.userName = 'Falha ao pegar nome';
            }
            next()
        })

    //bodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //handleBars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //mongose
        mongoose.Promise = global.Promise;
        mongoose.connect(conections.mongoConec,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() =>{
            console.log("connectado ao mongo")
        }).catch((err)=>{
            console.log("erro ao connectar: "+ err + "\n VERIFIQUE O ARQUIVO helpers > connec.js")
        })
    //Public pasta
        app.use(express.static(path.join(__dirname, "public")))

//rotas
    app.get('/', (req, res)=>{
        Produto.find().lean().populate("categoria").sort({data: "desc"}).then((produtos)=>{
            Categoria.find().lean().then((categorias) => {
                res.render("index", {produtos, categorias})
            }).catch((err)=>{
                req.flash("error_msg", "Erro interno em categorias")
                res.redirect("/404")
            })
        }).catch((err)=>{
            req.flash("error_msg", "Erro interno")
            res.redirect("/404")
        })
    })
    
    app.get("/postagem/:slug", (req, res)=>{
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem)=>{
            if(postagem){
                res.render("postagem/index", {postagem: postagem})
            }else{
                req.flash("error_msg", "postagem não encontrada")
                res.redirect("/")
            }
        }).catch((err)=>{
            req.flash("error_msg", "Erro interno")
            res.redirect("/")
        })
    })

    app.get("/404",(res, req)=>{
        res.send("erro 404!")
    })

    app.get('/categorias', (req, res)=>{
        Categoria.find().lean().then((categorias)=>{
            res.render('categoria/index', {categorias})
        }).catch((err)=>{
            req.flash("error_msg", "Erro ao listar categorias")
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug", (req, res)=>{
        Categoria.findOne({slug: req.params.slug}).lean().then((categoria)=>{
            if(categoria){
                Produto.find({categoria: categoria._id}).lean().then((produtos)=>{
                    res.render("categoria/produtos",{produtos, categoria})
                }).catch((err)=>{
                    req.flash("error_msg", "erro ao listar posts")
                    res.redirect("/")
                })
            }else{
                req.flash("error_msg","categoria n existe")
                res.redirect("/")
            }
        }).catch((err)=>{
            req.flash("error_msg", "Erro interno ao carregar pagina da categoria")
            res.redirect("/")
        })
    })

    app.use('/admin', admin)
    app.use('/usuario', usuario)



const PORT = process.env.PORT || 3000
app.listen(conections.porta, () => {
    console.log('Its runnin! on port '+ conections.porta)
})