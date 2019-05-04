import React from 'react';
import PropTypes from 'prop-types';
import QR from './QR';

import './App.css';

class App extends React.Component {
  static propTypes = {
    "match": PropTypes.shape( {
      "uuid": PropTypes.string,
    } ),
  };

  render() {
    let uuid;

    if ( this.props.match ) {
      ( { uuid } = this.props.match.params );
    } else {
      uuid = null;
    }

    return (
      <main className="App">
        <QR data={ uuid } />
      </main>
    );
  }
}

export default App;
