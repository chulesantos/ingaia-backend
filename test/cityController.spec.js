const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

chai.use(http);
chai.use(subSet);

const citySchema =
    {
        city: city => city,
        country: country => country,
        wind: wind => wind,
        temp: temp => temp,
        temp_min: temp_min => temp_min,
        temp_max: temp_max => temp_max,
        pressure: pressure => pressure,
        humidity: humidity => humidity,
        dt_search: dt_search => dt_search
    };

describe('Teste de Rotas - CityController', () => {

    it('/city/listar - GET', () => {
        chai.request(express)
            .get('/city/listar')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
            /*    chai.expect(res.body.length).to.be.equal(4);
                chai.expect(res.body).to.containSubset([citySchema]);*/
            });

    });
})