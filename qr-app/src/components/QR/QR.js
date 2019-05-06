import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading/Loading';

import './QR.css';

class QR extends React.Component {
  static propTypes = {
    "data": PropTypes.string,
    "linkTo": PropTypes.string,
    "size": PropTypes.string,
    "charsetSource": PropTypes.oneOf( [
      "ISO-8859-1",
      "UTF-8",
    ] ),
    "charsetTarget": PropTypes.oneOf( [
      "ISO-8859-1",
      "UTF-8",
    ] ),
    "ecc": PropTypes.oneOf( [
      "L", // low, ~7% destroyed data may be corrected
      "M", // middle, ~15% destroyed data may be corrected
      "Q", // quality, ~25% destroyed data may be corrected
      "H", // high, ~30% destroyed data may be corrected
    ] ),
    "color": PropTypes.string,
    "bgcolor": PropTypes.string,
    "margin": PropTypes.number,
    "qzone": PropTypes.number,
    "format": PropTypes.oneOf( [
      "png",
      "gif",
      "jpeg",
      "jpg",
      "svg",
      "eps",
    ] ),
    "isLoading": PropTypes.bool,
  };

  static defaultProps = {
    // "size": "250x250",
    "format": "svg",
    "isLoading": true,
  }

  static apiEndpoint = 'https://api.qrserver.com/v1/create-qr-code/';

  shouldBeLinked() {
    return !!this.props.linkTo;
  }

  getDimensions() {
    let size;

    if ( this.props.size ) {
      ( { size } = this.props );
    } else {
      size = '250x250';
    }

    size = size.split( 'x' );

    return {
      "width": size[0],
      "height": size[1],
    };
  }

  getImgSrc() {
    const params = [];

    if ( this.props ) {
      // API reference: http://goqr.me/api/doc/create-qr-code/
      if ( this.props.linkTo ) {
        params.push( `data=${encodeURIComponent( this.props.linkTo )}` );
      } else if ( this.props.data ) {
        params.push( `data=${this.props.data}` );
      }

      if ( this.props.size ) {
        params.push( `size=${this.props.size}` );
      }

      if ( this.props.charsetSource ) {
        params.push( `charset-source=${this.props.charsetSource}` );
      }

      if ( this.props.charsetTarget ) {
        params.push( `charset-target=${this.props.charsetTarget}` );
      }

      if ( this.props.ecc ) {
        params.push( `ecc=${this.props.ecc}` );
      }

      if ( this.props.color ) {
        params.push( `color=${this.props.color}` );
      }

      if ( this.props.bgcolor ) {
        params.push( `bgcolor=${this.props.bgcolor}` );
      }

      if ( this.props.margin ) {
        params.push( `margin=${this.props.margin}` );
      }

      if ( this.props.qzone ) {
        params.push( `qzone=${this.props.qzone}` );
      }

      if ( this.props.format ) {
        params.push( `qzone=${this.props.format}` );
      }

      return `${QR.apiEndpoint}?${params.join( '&' )}`;
    }

    return QR.apiEndpoint;
  }

  render() {
    const dimensions = this.getDimensions();

    const img = (
      <>
        <Loading isVisible={ this.props.isLoading } />
        <img
          width={ dimensions.width }
          height={ dimensions.height }
          className={ this.props.className }
          src={ this.getImgSrc() }
          alt="QR code"
        />
      </>
    );

    return (
      this.shouldBeLinked()
        ? <a
            className="qr-container"
            title="Follow QR code link"
            href={ this.props.linkTo }
            // onClick={ event => event.preventDefault() }
          >{ img }</a>
        : img
    );
  }
}

export default QR;
