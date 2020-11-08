const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")

require("../models/Produto")
const Produto = mongoose.model("produtos")

const {isAdmin}= require("../helpers/isAdmin")

router.get('/', isAdmin, (req, res) => {
    res.render('admin/index')
})

router.get('/post', isAdmin, (req, res) => {
    res.send('pag de posts')
})

//produtos

router.get('/produtos', isAdmin, (req, res) => {
    Produto.find().populate("categoria").sort({data:"desc"}).lean().then((produtos)=>{
        res.render('admin/produtos', {produtos})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar produtos!");
        res.redirect("/admin")
    })
})

router.get('/produtos/add', isAdmin, (req, res) => {
    Categoria.find().lean().then((categorias)=>{
        res.render("admin/addprodutos", {categorias})
    }).catch((err)=>{
        req.flash("error_msg","erro ao carregar formulario")
        res.redirect("/admin")
    })
})

router.post('/produtos/novo', (req, res) => {
    
    var erros = []

    //if(!req.body.nome 
    //    || typeof req.body.nome == undefined 
    //    || req.body.nome == null){
    //        erros.push({texto: "Nome inválido"})
    //}
    //if(!req.body.slug 
    //    || typeof req.body.slug == undefined 
    //    || req.body.slug == null){
    //        erros.push({texto: "slug inválido"})
    //}
    
    if(erros.length > 0){
        res.render("admin/addprodutos", {erros: erros})
    }else{
        const novoProduto = {
            nome: req.body.prodNome,
            slug: req.body.prodSlug,
            descricao: req.body.prodDesc,
            categoria: req.body.prodCategoria,
            preco: req.body.prodPreco,
            quantidade: req.body.prodQuantidade,
            imagem: req.body.prodImagem
        }
        console.log("produto nome:"+ novoProduto.nome);
        console.log("produto sluh:"+ novoProduto.slug);
        console.log("produto descricao:"+ novoProduto.descricao);
        new Produto(novoProduto).save().then(()=>{
            req.flash("success_msg", "Produto criada com sucesso!")
            res.redirect("/admin/produtos")
        }).catch((err)=>{
            console.log(err)
            req.flash("error_msg", "Houve um erro ao salvar produtop, tente novamente!")
            res.redirect("/admin/produtos")
        })
    }
})

router.post("/produtos/deletar", isAdmin, (req, res)=>{
    Produto.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Produto deletado com sucesso!")
        res.redirect("/admin/produtos") 
    }).catch(()=>{
        req.flash("error_msg", "Erro ao deletar!")
        res.redirect("/admin/produtos")
    })
})

router.get("/produtos/edit/:id", isAdmin, (req, res)=>{
    //res.send("Página de edição de categoria") //mostra msg na pagina
    Produto.findOne({_id:req.params.id}).lean().then((produto)=>{
        Categoria.find().lean().then((categorias)=>{
            res.render("admin/editprodutos", {produto, categorias})
        }).catch((err)=>{
            req.flash("error_msg", "Erro ao listar categorias")
            res.redirect("/admin/produtos")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Este produto não existe")
        res.redirect("/admin/produtos")
    })
})

router.post('/produtos/edit', isAdmin, (req, res) => {
    
    Produto.findOne({_id: req.body.id}).then((produto)=>{
        produto.nome = req.body.prodNome,
        produto.slug = req.body.prodSlug,
        produto.descricao = req.body.prodDesc,
        produto.categoria = req.body.prodCategoria,
        produto.preco = req.body.prodPreco,
        produto.quantidade = req.body.prodQuantidade,
        produto.imagem = req.body.prodImagem
        


        produto.save().then(()=>{
            req.flash("success_msg", "Produto editado com sucesso3")
            res.redirect("/admin/produtos")
        }).catch((err)=>{
            console.log(err)
            req.flash("error_msg", "erro ao salvar edicao de produto")
            res.redirect("/admin/produtos")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Ero ao editar produto")
        res.redirect("/admin/produtos")
    })
})

//categorias
router.get('/categorias', isAdmin, (req, res) => {
    Categoria.find().lean().then((categorias)=>{
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar categorias");
        res.redirect("/admin")
    })
})

router.get('/categorias/add', isAdmin, (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', isAdmin, (req, res) => {
    
    var erros = []

    if(!req.body.nome 
        || typeof req.body.nome == undefined 
        || req.body.nome == null){
            erros.push({texto: "Nome inválido"})
    }
    if(!req.body.slug 
        || typeof req.body.slug == undefined 
        || req.body.slug == null){
            erros.push({texto: "slug inválido"})
    }
    
    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
            res.redirect("/admin")
        })
    }
})

router.get("/categorias/edit/:id", isAdmin, (req, res)=>{
    //res.send("Página de edição de categoria") //mostra msg na pagina
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err)=>{
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post('/categorias/edit', isAdmin, (req, res) => {

    Categoria.findById({_id: req.body.id}).then((categoria)=>{
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(()=>{
            req.flash("success_msg", "categoria editada com sucesso")
            res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg", "erro ao salvar edicao de categoria")
            res.redirect("/admin/categorias")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Ero ao editar categoria")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar", isAdmin, (req, res)=>{
    Categoria.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "deletada com sucesso!")
        res.redirect("/admin/categorias") 
    }).catch(()=>{
        req.flash("error_msg", "erro ao editar!")
        res.redirect("/admin/categorias")
    })
})



router.get('/postagens', isAdmin, (req, res) => {
    Postagem.find().populate("categoria").sort({data:"desc"}).lean().then((postagens)=>{
        res.render('admin/postagens', {postagens: postagens})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar postagens");
        res.redirect("/admin")
    })
})


router.get("/postagens/add", isAdmin, (req, res)=>{
    Categoria.find().lean().then((categorias)=>{
        res.render("admin/addpostagens", {categorias})
    }).catch((err)=>{
        req.flash("error_msg","erro ao carregar formulario")
        res.redirect("/admin")
    })
})

router.post("/postagens/nova", isAdmin, (req, res)=>{
    var erros = []

    if(req.body.categoria == "0"){
        erros.push({texto: "categoria invalida, registre uma categoria"})
    }

    if(erros.length > 0){
        res.render("admin/addpostagens", {erros})
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }
        new Postagem(novaPostagem).save().then(()=>{
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao salvar a postagem, tente novamente!")
            res.redirect("/admin")
        })
    }
})

router.get("/postagens/edit/:id", isAdmin, (req, res)=>{
    //res.send("Página de edição de categoria") //mostra msg na pagina
    Postagem.findOne({_id:req.params.id}).lean().then((postagem)=>{
        Categoria.find().lean().then((categorias)=>{
            res.render("admin/editpostagens", {postagem, categorias})
        }).catch((err)=>{
            req.flash("error_msg", "Erro ao listar categorias1")
            res.redirect("/admin/postagens")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Esta postagem não existe2")
        res.redirect("/admin/postagens")
    })
})

router.post('/postagens/edit', isAdmin, (req, res) => {

    Postagem.findOne({_id: req.body.id}).then((postagem)=>{
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria

        postagem.save().then(()=>{
            req.flash("success_msg", "Postagem editada com sucesso3")
            res.redirect("/admin/postagens")
        }).catch((err)=>{
            console.log(err)
            req.flash("error_msg", "erro ao salvar edicao de postagem4")
            res.redirect("/admin/postagens")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Ero ao editar postagem5")
        res.redirect("/admin/postagens")
    })
})

router.post("/postagens/deletar", isAdmin, (req, res)=>{
    Postagem.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "deletada com sucesso!")
        res.redirect("/admin/postagens") 
    }).catch(()=>{
        req.flash("error_msg", "erro ao editar!")
        res.redirect("/admin/postagens")
    })
})

module.exports = router