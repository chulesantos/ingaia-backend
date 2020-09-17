const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

const config = require('../app/config/settings.json');

const token = require('../app/helpers/Token');

const token_test = token.generateJWT(config.jwt.expiresIn);

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

    it('/user/create - POST', () => {
        chai.request(express)
            .post('/user/create')
            .send({
                login: 'user-teste',
                password: '123456789'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
            });
    });

    it('/user/list - GET', () => {
        chai.request(express)
            .get('/user/list')
            .set('Authorization', token_test)
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.containSubset([userInsertShema]);
            });
    });

});