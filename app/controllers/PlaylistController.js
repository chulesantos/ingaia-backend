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

            // Retrieve an access token
            spotifyApi.clientCredentialsGrant().then(
                function(data) {
                  //  console.log('The access token expires in ' + data.body['expires_in']);
                 //   console.log('The access token is ' + data.body['access_token']);

                    // Save the access token so that it's used in future calls
                    spotifyApi.setAccessToken(data.body['access_token']);

                    const token = data.body['access_token'];

                    console.log(token);

                    spotifyApi.setAccessToken(token);

                    // Get Elvis' albums
                    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
                        function(data) {
                            console.log('Artist albums', data.body);
                        },
                        function(err) {
                            console.error(err);
                        }
                    );

                },
                function(err) {
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