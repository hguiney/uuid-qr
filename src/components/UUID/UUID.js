import React from 'react';
import PropTypes from 'prop-types';

import uuidv4 from 'uuid/v4';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import './UUID.css';

class UUID extends React.Component {
  static propTypes = {
    "uuid": PropTypes.string,
    "onRegenerate": PropTypes.func,
  };

  static generate() {
    return uuidv4();
  }

  onRegenerate = () => {
    this.props.onRegenerate( uuidv4() );
  }

  render() {
    return (
      <>
        {/* Open bracket intentionally left on separate line to preserve whitespace */}
        <label className="UUID center-self-vertically">Current UUID: <
          output className="UUID__text">{ this.props.uuid }</output>
        </label>
        <button
          className="UUID__regenerate button center-self-vertically"
          title="Generate new UUID"
          onClick={ this.onRegenerate }
        >
          <FontAwesomeIcon icon={ faRedo } />
          <span className="screen-readers-only">Generate new UUID</span>
        </button>
      </>
    );
  }
}

export default UUID;
