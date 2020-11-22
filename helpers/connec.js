//Variaveis de conexao

module.exports = {
    conections:{
        porta : process.env.PORT || 3000,

        //PADRÃO PARA UMBLER --> NAO FUNCIONA LOCAL
        //mongodb://blogmongol:blogmongol123@mongo_blogmongol:27017/blogmongol

        //PARA AMBIENTE LOCAL, DEVE SER ESSE:
        //mongodb://localhost/blogapp
        mongoConec : "mongodb://blogmongol:blogmongol123@mongo_blogmongol:27017/blogmongol"
    }
}
