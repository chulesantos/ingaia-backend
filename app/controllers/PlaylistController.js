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

        spotifyApi.clientCredentialsGrant()
            .then(result => {
                return result
            })
            .then(result => {

                const token = result.body['access_token'];

                spotifyApi.setAccessToken(token);

                return spotifyApi;
            })
            .then(async result => {

                const getPlaylist = await spotifyApi.getPlaylistsForCategory('classical', {
                    country: 'BR',
                    limit: 10,
                    offset: 0
                })

                return getPlaylist;
            })
            .then(result => {

                let index = Math.floor(Math.random() * 10);

                const spotify = result.body;

                let playlist_id = spotify.playlists.items[index].id;

                const dataPlaylist =
                    {
                        id: playlist_id,
                        playlist: spotify.playlists.items[index].name,
                        desc: spotify.playlists.items[index].description
                    }

                return dataPlaylist;

            })
            .then(async resultPlaylist => {

                const getPlaylistTracks = await spotifyApi.getPlaylistTracks(resultPlaylist.id, {
                    fields: 'items'
                })

                const tracksPlaylist = [];

                const tracks = getPlaylistTracks.body.items;

                Object.keys(tracks).map(objectKey => {

                    tracksPlaylist.push(tracks[objectKey].track.name);

                })

                resultPlaylist.tracks = tracksPlaylist;

                console.log(resultPlaylist);

                return resultPlaylist;

            })
            .catch(error => error)

    }
}

module.exports = PlaylistController;