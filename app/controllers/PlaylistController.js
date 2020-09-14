const Middleware = require('../config/Middleware');
const config = require('../config/settings');

class PlaylistController {

    routes() {
        return {
            playlist: '/playlist'
        };
    }

    static spotifyApi() {

        const spotifyWebApi = Middleware.spotifyWebApi();

        const spotifyApi = new spotifyWebApi({
            clientId: config.apispotify.client_id,
            clientSecret: config.apispotify.client_secret
        });

        return spotifyApi;
    }

    async playlist() {

        const spotifyApi = PlaylistController.spotifyApi();

        //pop, rock, classical

        return spotifyApi.clientCredentialsGrant()
            .then(result => {
                /* result.body['expires_in']);
                 result.body['access_token']);*/

                const token = result.body['access_token'];

                spotifyApi.setAccessToken(token);

                let index = Math.floor(Math.random() * 10);

                spotifyApi.getPlaylistsForCategory('classical', {
                    country: 'BR',
                    limit: 10,
                    offset: 0
                }).catch(error => error)
                    .then(result => {

                        const spotify = result.body;

                        let playlist_id = spotify.playlists.items[index].id;

                        const dataPlaylist =
                            {
                                id: playlist_id,
                                playlist: spotify.playlists.items[index].name,
                                desc: spotify.playlists.items[index].description
                            }

                        return dataPlaylist;

                    }).catch(error => error)
                    .then(resultPlaylist => {

                        spotifyApi.getPlaylistTracks(resultPlaylist.id, {
                            fields: 'items'
                        }).catch(error => error)
                            .then(async result => {

                                const tracks = result.body.items;

                                const musicas = [];

                                Object.keys(tracks).map(objectKey => {

                                    musicas.push(tracks[objectKey].track.name);

                                })

                                return resultPlaylist.tracks = musicas;

                            }).catch(error => error).then(result => {


                        })
                    })
            })

    }
}

module.exports = PlaylistController;