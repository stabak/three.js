/**
 * @author alteredq / http://alteredqualia.com/
 */

import {Pass} from './EffectComposer'
import {Mesh} from '../../../src/objects/Mesh'
import {Scene} from '../../../src/scenes/Scene'
import {UniformsUtils} from '../../../src/renderers/shaders/UniformsUtils'
import {ShaderMaterial} from '../../../src/materials/ShaderMaterial'
import {OrthographicCamera} from '../../../src/cameras/OrthographicCamera'
import {PlaneBufferGeometry} from '../../../src/geometries/PlaneBufferGeometry'

function ShaderPass ( shader, textureID ) {

	Pass.call( this );

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	if ( shader instanceof ShaderMaterial ) {

		this.uniforms = shader.uniforms;

		this.material = shader;

	} else if ( shader ) {

		this.uniforms = UniformsUtils.clone( shader.uniforms );

		this.material = new ShaderMaterial( {

			defines: shader.defines || {},
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

	}

	this.camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene = new Scene();

	this.quad = new Mesh( new PlaneBufferGeometry( 2, 2 ), null );
	this.scene.add( this.quad );

};

ShaderPass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: ShaderPass,

	render: function( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera );

		} else {

			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

} );

export { ShaderPass };