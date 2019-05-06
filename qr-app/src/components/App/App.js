import React from 'react';
import PropTypes from 'prop-types';

import QR from '../QR/QR';
import UUID from '../UUID/UUID';

import './App.css';

class App extends React.Component {
  static propTypes = {
    "match": PropTypes.object,
    "location": PropTypes.object,
    "history": PropTypes.object,
  };

  state = {
    "uuid": this.getUuidFromProps(),
    "isLoading": false,
  }

  linkEndpoint = 'https://interviews.getmarlo.com/';

  getUuidFromProps() {
    return ( this.receivedUuidFromUrl() ? this.props.match.params.uuid : '' );
  }

  getLinkUrl() {
    if ( this.state.uuid ) {
      return `${this.linkEndpoint}?id=${this.state.uuid}`;
    }

    return this.linkEndpoint;
  }

  receivedUuidFromUrl() {
    return (
      this.props.match
      && this.props.match.params
      && this.props.match.params.uuid
    );
  }

  hasUuid() {
    return !!this.state.uuid;
  }

  uuidIsValid() {
    // https://www.regextester.com/99148
    const pattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    return pattern.test( this.state.uuid );
  }

  onRegenerate = ( uuid ) => {
    this.props.history.push( `/${uuid}` );
  }

  componentDidUpdate() {
    const uuid = this.getUuidFromProps();

    if ( this.state.uuid !== uuid ) {
      this.setState( {
        uuid,
        "isLoading": true,
      } );
    }
  }

  /*
    The onLoad event bubbles up from the QR <img />.
    Handling it at this level allows us to hide the spinner
    after the new API response is returned.
  */
  onLoad = () => {
    this.setState( {
      "isLoading": false,
    } );
  }

  render() {
    return (
      <div className="App" onLoad={ this.onLoad }>
        <header className="App__header">
          <h1 className="App__heading">UUID-QR</h1>
          <UUID uuid={ this.state.uuid } onRegenerate={ this.onRegenerate } />
        </header>
        <main className="App__content center-contents-bidirectionally">
        {
          this.uuidIsValid()
            ? <QR
                margin={ 20 }
                isLoading={ this.state.isLoading }
                className="App__qr QR center-contents-bidirectionally"
                linkTo={ this.getLinkUrl() }
              />
            : <h2 className="QR center-contents-bidirectionally">Invalid UUID</h2>
        }
        </main>
      </div>
    );
  }
}

export default App;
