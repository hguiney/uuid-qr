import {
  // shallow,
  mount,
} from 'enzyme';
import React from 'react';
// import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App/App';
import Router from './Router';

describe( '<Router />', () => {
  it( 'renders a default route', () => {
    const component = mount(
      <MemoryRouter initialEntries={ ["/"] }>
        <Router />
      </MemoryRouter>,
    );

    expect( component.find( App ) ).toHaveLength( 1 );
  } );
} );
