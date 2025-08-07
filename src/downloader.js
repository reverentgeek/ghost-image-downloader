"use strict";

const fs = require( "fs-extra" );
const axios = require( "axios" );

module.exports.doTheDownloads = async ( { jsonFile, baseUrl, basePath }, logger ) => {
	const parseImages = post => {
		const findImages = () => post.html.match( /(?:<img src=".*\/)content[^"]*/gi );

		let matches = [];
		if ( post.feature_image ) {
			matches.push( post.feature_image );
		}
		if ( post.html && findImages() ) {
			matches = [ ...matches, ...findImages() ];
		}
		return matches;
	};

	const downloadImage = ( url, localPath ) => {
		logger.info( `downloading ${ url } to ${ localPath } ...` );
		return axios( { url, responseType: "stream" } )
			.then( response => {
				response.data.pipe( fs.createWriteStream( localPath ) );
				return "";
			} )
			.catch( () => url );
	};

	const backup = await fs.readJson( jsonFile );
	const blog = backup.db[ 0 ].data;
	let images = [];
	const badUrls = [];
	blog.posts.forEach( post => {
		images = [ ...images, ...parseImages( post ) ];
	} );
	const downloadPromises = [];
	for ( let i = 0; i < images.length; i++ ) {
		let image = images[ i ];
		image = image.replace( "<img src=\"", "" );
		image = image.replace( /"( class.*)?/, "" );
		image = image.replace( "__GHOST_URL__/", "" );
		const parts = image.split( "/" );
		const filename = parts.pop();
		const localPath = `${ basePath }/${ parts.join( "/" ) }`;
		const filePath = `${ localPath }/${ filename }`;
		// Skip images hosted on other servers (ie CDNs or so)
		if ( !image.startsWith( "http" ) && !fs.existsSync( filePath ) ) {
			fs.ensureDirSync( localPath );
			downloadPromises.push( downloadImage( `${ baseUrl }/${ image }`, filePath ) );
		}
	}
	const results = await Promise.allSettled( downloadPromises );
	for ( const result of results ) {
		if ( result.value ) {
			badUrls.push( result.value );
		}
	}
	logger.info( "finished downloading" );
	if ( badUrls.length > 0 ) {
		logger.warn( "failed to download:", badUrls );
	}
};
