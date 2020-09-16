const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

chai.use(http);
chai.use(subSet);

describe('Teste de Rotas - WeatherController', () => {

    it('/clima/:city - GET', () => {
        chai.request(express)
            .get('/clima/Vitoria')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
            });
    });
})