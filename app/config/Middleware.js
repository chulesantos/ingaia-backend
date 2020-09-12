class Middleware {

    static express() {
        const express = require('express');
        return express;
    }

    static bodyParser() {
        const bodyParser = require('body-parser');
        return bodyParser;
    }

    static mongoose() {
        const mongoose = require('mongoose');
        return mongoose;
    }

    static fs() {
        const fs = require('fs');
        return fs;
    }

    static jwt() {
        const jwt = require('jsonwebtoken');
        return jwt;
    }

    static crypto() {
        const crypto = require('crypto');
        return crypto;
    }

    static request() {
        const request = require('request');
        return request;
    }

    static spotifyWebApi() {
        const spotifyWebApi = require('spotify-web-api-node');
        return spotifyWebApi;
    }
}

module.exports = Middleware;