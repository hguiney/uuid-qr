import {
  // shallow,
  mount,
} from 'enzyme';
import React from 'react';

import Loading from './Loading';

describe( '<Loading />', () => {
  it( 'works', () => {
    mount( <Loading /> );
  } );
} );
