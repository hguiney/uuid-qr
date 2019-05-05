import React from 'react';
import PropTypes from 'prop-types';

import './QR.css';

class QR extends React.Component {
  static propTypes = {
    "size": PropTypes.string,
    "data": PropTypes.string,
    "linkTo": PropTypes.string,
  };

  static apiEndpoint = 'https://api.qrserver.com/v1/create-qr-code/';

  shouldBeLinked() {
    return !!this.props.linkTo;
  }

  getImgSrc() {
    const params = [];

    if ( this.props ) {
      if ( this.props.size ) {
        params.push( `size=${this.props.size}` );
      } else {
        params.push( `size=150x150` );
      }

      if ( this.props.linkTo ) {
        params.push( `data=${encodeURIComponent( this.props.linkTo )}` );
      } else if ( this.props.data ) {
        params.push( `data=${this.props.data}` );
      }

      return `${QR.apiEndpoint}?${params.join( '&' )}`;
    }

    return QR.apiEndpoint;
  }

  render() {
    const img = (
      <img
        className={ this.props.className }
        src={ this.getImgSrc() }
        alt="QR code"
      />
    );

    return (
      this.shouldBeLinked()
        ? <a
            title="Follow QR code link"
            href={ this.props.linkTo }
            // onClick={ event => event.preventDefault() }
          >{ img }</a>
        : img
    );
  }
}

export default QR;
