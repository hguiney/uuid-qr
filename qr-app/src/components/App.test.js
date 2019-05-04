import { mount } from 'enzyme';
import React from 'react';
import App from './App';
import QR from './QR';

describe( '<App />', () => {
  it( 'renders a QR element', () => {
    const component = mount( <App /> );

    expect( component.containsMatchingElement( <QR /> ) ).toBeTruthy();
  } );
} );
