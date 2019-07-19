import {
  shallow,
  // mount,
} from 'enzyme';
import React from 'react';

import QR from './QR';

const sampleQrCodeApiCall = 'https://api.qrserver.com/v1/create-qr-code/?data=a26c1fc1-37e9-4f89-8ca2-01165c2367b1&format=svg';

describe( '<QR />', () => {
  it( 'renders an image', () => {
    const component = shallow( <QR /> );
    expect( component.containsMatchingElement( <img alt="QR code" /> ) ).toBeTruthy();
  } );

  it( 'generates the correct API call', () => {
    const component = shallow( <QR data="a26c1fc1-37e9-4f89-8ca2-01165c2367b1" /> );
    expect( component.find( 'img' ).prop( 'src' ) ).toEqual( sampleQrCodeApiCall );
  } );
} );
