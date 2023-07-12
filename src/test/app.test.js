const app = require("../app")
const filme = require("../models/filmeSchema")
const request = require("supertest")
const mongoose = require("mongoose")

describe('filmesControllers', () => {
    
    const filmeMock = {
        "nome": "Filme",
        "diretor": "Diretor",
        "categoria": "Categoria"
    }

    beforeAll(async() => {
        const novoFilme = new filme(filmeMock)
        await novoFilme.save()
        filmeMock.id = novoFilme._id
    })

    afterAll(async() => {
        await mongoose.connection.close()
    })

    test('GET /mostratodos', (done) => {
        request(app)
            .get("/filmes/mostratodos")
            .expect(200)
            .expect(res => {
                expect(res.body.message).toBe("Todos os Filmes")
            })
            .end(err => {
                if (err) {
                    return done(err)
                }
                return done()
            })
    })

    test('POST /novofilme', (done) => {
        const filmeBody = {
            "nome": "Filme",
            "diretor": "Diretor",
            "categoria": "Categoria"
        }

        request(app)
            .post("/filmes/novofilme")
            .send(filmeBody)
            .expect(201)
            .expect(res => {
                expect(res.body.message).toBe("Filme Cadastrado")
            })
            .end(err => {
                if (err) {
                    return done(err)
                }
                return done()
            })
    })

    test('PATCH /editafilme/:id', (done) => {
        const filmePatchBody = {
            "nome": "Filme 2",
            "diretor": "Diretor 2",
            "categoria": "Categoria 2"
        }

        request(app)
            .patch("/filmes/editafilme/" + filmeMock.id)
            .send(filmePatchBody)
            .expect(200)
            .expect(res => {
                expect(res.body.message).toBe("Filme Atualizado")
            })
            .end(err => {
                if (err) {
                    return done(err)
                }
                return done()
            })
    })

    test('DELETE /deletafilme/:id', (done) => {
        request(app)
            .delete("/filmes/deletafilme/" + filmeMock.id)
            .expect(200)
            .expect(res => {
                expect(res.body.message).toBe("Filme Deletado")
            })
            .end(err => {
                if (err) {
                    return done(err)
                }
                return done()
            })
    })
});
