const mongoose = require("mongoose");

const filmeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    diretor: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: false
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

module.exports=mongoose.model('filme', filmeSchema);