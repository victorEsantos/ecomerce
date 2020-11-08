const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Produto = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    },
    preco: {
        type: Number
    },
    quantidade: {
        type: Number
    },
    imagem: {
        type: String
    }
})
mongoose.model("produtos", Produto)