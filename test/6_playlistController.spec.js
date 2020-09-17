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

const apiSpotify = new PlaylistController();

describe('Teste de Promises - PlaylistController', () => {

    it('construtor', () => {

        chai.expect(apiSpotify).to.containSubset(spotifyApiSchema);

    });

    it('spotifyToken', () => {

        chai.expect(apiSpotify.spotifyToken()).to.be.a('promise');

    });

    it('playlistForCategory', () => {

        chai.expect(apiSpotify.playlistForCategory('Vitoria', 'pop')).to.be.a('promise');

    });

    it('getPlaylistTracks', () => {

        const dataPlaylist =
            {
                id: '37i9dQZF1DX1spT6G94GFC',
                playlist: '80s Rock Anthems',
                desc: 'These songs rocked the 80s. Cover: AC/DC.'
            };

        chai.expect(apiSpotify.getPlaylistTracks(dataPlaylist)).to.be.a('promise');

    });

    it('getPlaylistFromWeather', () => {

        chai.expect(apiSpotify.getPlaylistFromWeather('pop', 'BR')).to.be.a('promise');

    });
});

