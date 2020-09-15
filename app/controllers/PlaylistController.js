const Middleware = require('../config/Middleware');
const config = require('../config/settings');

class PlaylistController {

    spotifyApi;

    constructor() {

        const spotifyWebApi = Middleware.spotifyWebApi();

        this.spotifyApi = new spotifyWebApi({
            clientId: config.apispotify.client_id,
            clientSecret: config.apispotify.client_secret
        });
    }

    spotifyToken() {

        return new Promise((resolve, reject) => {

            this.spotifyApi.clientCredentialsGrant()
                .then(result => {

                    this.spotifyApi.setAccessToken(result.body['access_token']);
                    resolve()

                }).catch(error => {
                reject(error)
            })
        })
    }

    playlistForCategory(category, country) {

        return new Promise((resolve, reject) => {

            this.spotifyApi.getPlaylistsForCategory(category, {
                country: country,
                limit: 10,
                offset: 0
            }).then(result => {

                resolve(result)

            }).catch(error => {
                reject(error)
            })
        })
    }

    dataPlaylist(data) {

        return new Promise((resolve) => {

            let index = Math.floor(Math.random() * 10);

            const spotify = data.body;

            let playlist_id = spotify.playlists.items[index].id;

            const dataPlaylist =
                {
                    id: playlist_id,
                    playlist: spotify.playlists.items[index].name,
                    desc: spotify.playlists.items[index].description
                }
            resolve(dataPlaylist);
        })
    }

    getPlaylistTracks(dataPlaylist) {

        return new Promise((resolve, reject) => {

            this.spotifyApi.getPlaylistTracks(dataPlaylist.id, {
                fields: 'items'

            }).then(result => {

                const tracksPlaylist = [];

                const tracks = result.body.items;

                Object.keys(tracks).map(objectKey => {

                    tracksPlaylist.push(tracks[objectKey].track.name);

                })

                const resultPlaylist = dataPlaylist;

                resultPlaylist.tracks = tracksPlaylist;

                delete resultPlaylist.id;

                resolve(resultPlaylist);

            }).catch(error => {
                reject(error)
            })
        })
    }

    async playlist(category, country) { //pop, rock, classical

        return Promise.resolve().then(() => {

            return this.spotifyToken();

        })
            .then(() => {

                return this.playlistForCategory(category, country);

            })
            .then(result => {

                return this.dataPlaylist(result);

            })
            .then(result => {

                return this.getPlaylistTracks(result);

            })
            .then(result => result)
            .catch(error => error)

    }
}

module.exports = PlaylistController;