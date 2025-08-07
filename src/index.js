"use strict";

const configya = require( "configya" );
const fs = require( "fs-extra" );
const downloader = require( "./downloader" );
const logger = require( "./logger" );

const main = async () => {
	if ( fs.existsSync( "./config.json" ) ) {
		const config = configya( { file: "./config.json" } );
		await downloader.doTheDownloads( config, logger );
	} else {
		logger.error( "A config.json file is required. Please see the readme." );
	}
};

main();
