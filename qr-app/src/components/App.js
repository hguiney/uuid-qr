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

  uuidIsValid() {
    // https://www.regextester.com/99148
    const pattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

    if ( this.props.match && this.props.match.params ) {
      return pattern.test( this.props.match.params.uuid );
    }

    return false;
  }

  render() {
    let uuid;

    if ( this.props.match ) {
      ( { uuid } = this.props.match.params );
    } else {
      uuid = null;
    }

    return (
      <main className="App --center">
        { this.uuidIsValid() ? <QR className="QR --center" data={ uuid } /> : <h2 className="QR --center">Invalid UUID</h2> }
      </main>
    );
  }
}

export default App;
