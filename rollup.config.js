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
    targets: [
        {
            format: 'umd',
            moduleName: 'THREE',
            dest: 'build/three.js'
        },
        {
            format: 'es',
            dest: 'build/three.modules.js'
        }
    ],
    sourceMap: true
};