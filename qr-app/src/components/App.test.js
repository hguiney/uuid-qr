import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Router from './Router';

describe( 'App', () => {
  it( 'renders without crashing', () => {
    const div = document.createElement( 'div' );
    ReactDOM.render( <App />, div );
    ReactDOM.unmountComponentAtNode( div );
  } );

  it( 'reflects the UUID from the URL', () => {
    const component = mount(
      <MemoryRouter initialEntries={ ["/foo"] }>
        <Router />
      </MemoryRouter>,
    );
    const app = component.find( App );

    // Unfortunately mounting with initialEntries does not
    // actually set props/state so we have to do it manually
    app.setState( {
      "uuid": "foo",
    } );

    expect( app.text() ).toBe( 'foo' );
  } );
} );
