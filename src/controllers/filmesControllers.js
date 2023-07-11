const mongoose = require("mongoose")
const filmeSchema = require("../models/filmeSchema")

const exibeTodos = async(req,res)=>{
    let query = { }
    try {
        const todosResultados= await filmeSchema.find(query)
        res.status(200).json({
            message: "Todos os Filmes",
            resultados: todosResultados})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const cadastraFilme = async(req,res)=>{
    try {
        const { nome, diretor, categoria } = req.body
        const novoFilme = new filmeSchema({
            nome: nome,
            diretor: diretor,
            categoria: categoria
        })
        const salvaFilme = await novoFilme.save()
        res.status(201).json({
            message: "Filme Cadastrado",
            novoFilme: salvaFilme
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

const atualizaFilme = async(req,res)=>{
    const { nome, diretor, categoria } =req.body
    try {
        const encontraFilme = await filmeSchema.findById(req.params.id)
    if (!encontraFilme){
        return res.status(404).send({
            message: "filme não encontrado"
        })
    }
    if(nome) encontraFilme.nome=nome
    if(diretor) encontraFilme.diretor=diretor
    if(categoria) encontraFilme.categoria=categoria
    const salvarFilme = await encontraFilme.save()
    res.status(200).json({
        message: "Filme Atualizado",
        encontraFilme: salvarFilme})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deletaFilme = async(req,res)=>{
    try {
        const resultadoBusca = await filmeSchema.findById(req.params.id)
        await resultadoBusca.deleteOne()
        res.status(200).json({
            message: "Filme Deletado"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports={
    exibeTodos,
    cadastraFilme,
    atualizaFilme,
    deletaFilme
}