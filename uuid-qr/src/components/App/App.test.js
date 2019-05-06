import { mount } from 'enzyme';
import React from 'react';

import App from './App';
import QR from '../QR/QR';

describe( '<App />', () => {
  it( 'renders a QR element', () => {
    const component = mount( <App /> );

    // Unfortunately mounting with MemoryRouter.initialEntries
    // does not actually set props so we have to do it manually
    component.setProps( {
      "match": {
        "params": {
          "uuid": "a26c1fc1-37e9-4f89-8ca2-01165c2367b1",
        },
      },
    } );

    expect( component.containsMatchingElement( QR ) ).toBeTruthy();
  } );

  it( 'reports invalid UUIDs', () => {
    const component = mount( <App /> );
    component.setProps( {
      "match": {
        "params": {
          "uuid": "foo",
        },
      },
    } );
    component.update();

    const qr = component.find( '.App__qr--invalid' );

    expect( qr.text() ).toBe( 'Invalid UUID' );
  } );
} );
