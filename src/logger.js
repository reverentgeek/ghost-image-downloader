"use strict";

const winston = require( "winston" );
module.exports = winston.createLogger( {
	level: "info",
	format: winston.format.combine(
		winston.format.colorize( { all: true } ),
		winston.format.simple()
	),
	transports: [
		new winston.transports.Console()
	]
} );
