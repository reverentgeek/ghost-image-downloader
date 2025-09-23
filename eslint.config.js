"use strict";

const defineConfig = require( "eslint/config" ).defineConfig; // eslint-disable-line n/no-unpublished-require
const rg = require( "eslint-config-reverentgeek" );

module.exports = defineConfig( [
	{
		extends: [ rg.configs.node ],
		rules: {
		}
	}
] );
