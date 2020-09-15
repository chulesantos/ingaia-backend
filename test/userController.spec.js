const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

chai.use(http);
chai.use(subSet);

const userShema =
    {
        login: login => login,
        password: password => password

    };

describe('Teste de Rotas - UserController', () => {

    it('/usuario/cadastro - POST', () => {
        chai.request(express)
            .post('/usuario/cadastro')
            .send({
                login: 'user-teste',
                password: '123456789'
            })
            .end((err, res) => {

                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(userShema);
            });
    })

     /*it('/usuario/listar - GET', () => {
         chai.request(express)
             .get('/usuario/listar')
             .end((err, res) => {
                 chai.expect(err).to.be.null;
                 chai.expect(res).to.have.status(200);
                 chai.expect(res.body.length).to.be.equal(4);
                 chai.expect(res.body).to.containSubset([userShema]);
             });
     })*/

})