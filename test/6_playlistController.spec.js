const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const PlaylistController = require('../app/controllers/PlaylistController');

chai.use(http);
chai.use(subSet);

const spotifyApiSchema =
    {
        spotifyApi: {
            _credentials: {
                clientId: clientId => clientId,
                clientSecret: clientSecret => clientSecret
            }
        }
    };

const playlist = new PlaylistController();

describe('Teste de Promises - PlaylistController', () => {

    it('construtor', () => {

        chai.expect(playlist).to.containSubset(spotifyApiSchema);

    });

    it('spotifyToken', () => {

        chai.expect(playlist.spotifyToken()).to.be.a('promise');

    });

    it('playlistForCategory', () => {

        chai.expect(playlist.playlistForCategory('Vitoria', 'pop')).to.be.a('promise');

    });

    it('getPlaylistTracks', () => {

        const dataPlaylist =
            {
                id: '37i9dQZF1DX1spT6G94GFC',
                playlist: '80s Rock Anthems',
                desc: 'These songs rocked the 80s. Cover: AC/DC.'
            };

        chai.expect(playlist.getPlaylistTracks(dataPlaylist)).to.be.a('promise');

    });

    it('playlist', () => {

        chai.expect(playlist.playlist('pop', 'BR')).to.be.a('promise');

    });
});

