const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

chai.use(http);
chai.use(subSet);

describe('Teste de Rotas - CityController', () => {

    it('/city/listar - GET', () => {
        chai.request(express)
            .get('/city/listar')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
            });
    });
})