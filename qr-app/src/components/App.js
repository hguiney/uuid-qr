import React from 'react';
import PropTypes from 'prop-types';
import QR from './QR';

import './App.css';

class App extends React.Component {
  constructor( props ) {
    super( props );

    this.linkEndpoint = 'https://interviews.getmarlo.com/';
    this.uuid = this.gotUuid() ? this.props.match.params.uuid : '';
  }

  static propTypes = {
    "match": PropTypes.shape( {
      "uuid": PropTypes.string,
    } ),
  };

  getLinkUrl() {
    if ( this.uuid ) {
      return `${this.linkEndpoint}?id=${this.uuid}`;
    }

    return this.linkEndpoint;
  }

  gotUuid() {
    return ( this.props.match && this.props.match.params && this.props.match.params.uuid );
  }

  hasUuid() {
    return !!this.uuid;
  }

  uuidIsValid() {
    // https://www.regextester.com/99148
    const pattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    return pattern.test( this.uuid );
  }

  render() {
    return (
      <main className="App --center">{
        this.uuidIsValid()
          ? <QR className="QR --center" linkTo={ this.getLinkUrl() } />
          : <h2 className="QR --center">Invalid UUID</h2>
      }</main>
    );
  }
}

export default App;
