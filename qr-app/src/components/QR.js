import React from 'react';
import PropTypes from 'prop-types';

class QR extends React.Component {
  static propTypes = {
    "size": PropTypes.string,
    "data": PropTypes.string,
  };

  static apiEndpoint = 'https://api.qrserver.com/v1/create-qr-code/';

  getUrl() {
    const params = [];

    if ( this.props ) {
      if ( this.props.size ) {
        params.push( `size=${this.props.size}` );
      } else {
        params.push( `size=150x150` );
      }

      if ( this.props.data ) {
        params.push( `data=${this.props.data}` );
      }

      return `${QR.apiEndpoint}?${params.join( '&' )}`;
    }

    return QR.apiEndpoint;
  }

  render() {
    return (
      <img className={ this.props.className } src={ this.getUrl() } alt="QR code" />
    );
  }
}

export default QR;
