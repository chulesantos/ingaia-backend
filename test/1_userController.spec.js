const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

chai.use(http);
chai.use(subSet);

const userInsertShema =
    {
        _id: _id => _id,
        login: login => login,
        password: password => password,
        dt_insert: dt_insert => dt_insert
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
                chai.expect(res).to.have.all.status(200);
            });
    });

    it('/usuario/listar - GET', () => {
        chai.request(express)
            .get('/usuario/listar')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.containSubset([userInsertShema]);
            });
    });

});