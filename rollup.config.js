
var outro = `
Object.defineProperty( exports, 'AudioContext', {
	get: function () {
		return exports.getAudioContext();
	}
});`;

function glsl () {
	return {
		transform ( code, id ) {
			if ( !/\.glsl$/.test( id ) ) return;

			var transformedCode = 'export default ' + JSON.stringify(
				code
					.replace( /[ \t]*\/\/.*\n/g, '' )
					.replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' )
					.replace( /\n{2,}/g, '\n' )
			) + ';';
			return {
				code: transformedCode,
				map: { mappings: '' }
			}
		}
	};
}

const babel = require('rollup-plugin-babel'), nodeResolve = require( 'rollup-plugin-node-resolve' ) , commonjs = require( 'rollup-plugin-commonjs' );

export default {
    entry: 'src/Three.js',
    dest: 'build/three.js',
    moduleName: 'THREE',
    format: 'umd',
    indent: '\t',
    plugins: [
        glsl()
        glsl(),
        // babel({
        //     externalHelpers: false,
        //     exclude: './node_modules/**',
        //     presets: ['es2015-rollup']
        // }),
        nodeResolve({
            extensions: ['.js'],
            main: true,
            jsnext: true,
            browser: true,
            preferBuiltins: false
        }),
        commonjs({
            include: './node_modules/**'
        })
    ],

    outro: outro
};

