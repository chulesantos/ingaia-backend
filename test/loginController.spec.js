const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

chai.use(http);
chai.use(subSet);

const loginSchema =
    {
        auth: auth => auth,
        msg: msg => msg,
        token: token => token

    };

describe('Teste de Rotas - LoginController', () => {

    it('/login - POST', () => {
        chai.request(express)
            .post('/login')
            .send({
                login: 'user-teste',
                password: '123456789'
            })
            .end((err, res) => {

                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.containSubset(loginSchema);
            });
    })
})