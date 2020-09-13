const Middleware = require('../config/Middleware');
const config = require('../config/settings');

class PlaylistController {

    constructor() {

    }

    routes() {
        return {
            playlist: '/playlist'
        };
    }

    playlist() {

        return function (req, resp) {

            const spotifyWebApi = Middleware.spotifyWebApi();

            const spotifyApi = new spotifyWebApi({
                clientId: config.apispotify.client_id,
                clientSecret: config.apispotify.client_secret
            });

            //pop, rock, classical

            // Retrieve an access token
            spotifyApi.clientCredentialsGrant().then(
                function (data) {
                    //  console.log('The access token expires in ' + data.body['expires_in']);
                    //   console.log('The access token is ' + data.body['access_token']);

                    // Save the access token so that it's used in future calls
                    spotifyApi.setAccessToken(data.body['access_token']);

                    const token = data.body['access_token'];

                    //    console.log(token);

                    spotifyApi.setAccessToken(token);

                    /*     // Get Elvis' albums
                         spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
                             function(data) {
                                 console.log('Artist albums', data.body);
                             },
                             function(err) {
                                 console.error(err);
                             }
                         );*/

                   spotifyApi.getPlaylistTracks('37i9dQZF1DWXZo3QlWdchi', {
                        offset: 1,
                        limit: 5,
                        fields: 'items'
                    })
                        .then(
                            function (data) {
                                console.log(JSON.stringify(data.body));
                            },
                            function (err) {
                                console.log('Something went wrong!', err);
                            }
                        );


                    let index = Math.floor(Math.random() * 10);
                    // Get Playlists for a Category (Party in Brazil)
                    spotifyApi.getPlaylistsForCategory('rock', {
                        country: 'BR',
                        limit: 10,
                        offset: 0
                    })
                        .then(function (data) {

                            const spotify = data.body;

                            let playlist_id = spotify.playlists.items[index].id;

                            const playlist = {
                                id: playlist_id,
                                name: spotify.playlists.items[index].name,
                                desc: spotify.playlists.items[index].description

                            }

                         //   console.log(playlist);

                        }, function (err) {
                            console.log("Something went wrong!", err);
                        });


// Get tracks in a playlist


                },
                function (err) {
                    /*   console.log(
                           'Something went wrong when retrieving an access token',
                           err.message
                       );*/
                }
            );

            // console.log(token);


            /*spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
                function(data) {
                    console.log('Artist albums', data.body);
                },
                function(err) {
                    console.error(err);
                }
            );*/

            // resp.send('Testando a rota')

        }
    }
}

module.exports = PlaylistController;