const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const token = require('../app/helpers/Token');

chai.use(http);
chai.use(subSet);

describe('Teste de Função - Token', () => {

    it('generateJWT', () => {

        const id = 7848;

        chai.expect(token.generateJWT(id)).to.be.a('string');

    });
});

