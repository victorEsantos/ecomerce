module.exports = {
    isAdmin: (req, res, next)=>{
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }
        req.flash("error_msg", "Deve ser Administrador para conseguir acessar!")
        res.redirect("/")
    }
}