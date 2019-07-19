// https://github.com/airbnb/enzyme/issues/374#issuecomment-371868891
const JSDOMEnvironment = require( 'jest-environment-jsdom-fourteen' ); // eslint-disable-line import/no-extraneous-dependencies

console.warn( 'SuperJSDOMEnvironment' );

class SuperJSDOMEnvironment extends JSDOMEnvironment {
  constructor( config ) {
    super( config );
    global.window = this.global;
    global.document = this.document;

    // https://www.phpied.com/intercepting-new-image-src-requests/
    const NativeImage = this.global.Image;

    class FakeImage {
      constructor( w, h ) {
        const nativeImage = new NativeImage( w, h );
        const handler = {
          "set": function set( obj, prop, value ) {
            if ( prop === 'src' ) {
              // console.info( `original src: ${value}` );
              value = value
                .replace( /https?:\/\//i, 'file://' )
                .replace( /api\.qrserver\.com\/v1\/create-qr-code\/?\??/i, 'src/test-assets/' )
                .replace( /size=([0-9]+x[0-9]+)&data=([^?&=]+)/i, '$2--$1.png' );
              // console.info( `modified src: ${value}` );
            }
            nativeImage[prop] = value;

            return nativeImage[prop];
          },
          "get": function get( target, prop ) {
            return target[prop];
          },
        };
        return new Proxy( nativeImage, handler );
      }
    }

    this.global.Image = FakeImage; // May not be necessary
    global.Image = FakeImage;
  }
}

module.exports = SuperJSDOMEnvironment;
