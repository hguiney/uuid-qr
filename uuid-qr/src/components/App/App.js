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

  constructor( props ) {
    super( props );

    if ( !this.receivedUuidFromUrl() ) {
      const uuid = UUID.generate();

      this.state = {
        uuid,
      };

      if ( this.props.history ) {
        this.props.history.replace( `/${uuid}` );
      }
    }
  }

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
                className="App__qr center-contents-bidirectionally"
                // data="foo"
                linkTo={ this.getLinkUrl() }
                // size="256x256"
                // charsetSource="UTF-8"
                // charsetTarget="UTF-8"
                // ecc="L"
                // color="255-255-255"
                // bgcolor="128-128-128"
                margin={ 20 }
                // qzone={ 5 }
                // format="png"
                isLoading={ this.state.isLoading }
              />
            : <h2 className="App__qr App__qr--invalid center-contents-bidirectionally">Invalid UUID</h2>
        }
        </main>
      </div>
    );
  }
}

export default App;
