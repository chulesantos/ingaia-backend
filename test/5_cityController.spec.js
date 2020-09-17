const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

const config = require('../app/config/settings.json');

const token = require('../app/helpers/Token');

const token_test = token.generateJWT(config.jwt.expiresIn);

chai.use(http);
chai.use(subSet);

describe('Teste de Rotas - CityController', () => {

    it('/cities/search - GET', () => {
        chai.request(express)
            .get('/cities/search')
            .set('Authorization', token_test)
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
            });
    });
})