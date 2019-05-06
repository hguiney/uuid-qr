import {
  // shallow,
  mount,
} from 'enzyme';
import React from 'react';

import UUID from './UUID';

describe( '<UUID />', () => {
  it( 'works', () => {
    mount( <UUID /> );
  } );
} );
