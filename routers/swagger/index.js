const { pathStations, pathStationsId, definitionStation, definitionStations} = require('./stations');
const config = require('../../config');

module.exports = {
    swagger: '2.0',
    host: config.HOST,
    basePath: '/api',
    schemes: ['http', 'https'],
    consumes: ['aplication/json'],
    produces: ['aplication/json'],
    paths: {
        '/stations': pathStations,
        '/stations/{stationId}': pathStationsId
    },
    definitions: {
        Station: definitionStation,
        Stations: definitionStations
    }
}