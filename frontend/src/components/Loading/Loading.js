import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import './Loading.css';

class Loading extends React.Component {
  static propTypes = {
    "isVisible": PropTypes.bool,
  };

  static defaultProps = {
    "isVisible": false,
  };

  render() {
    return (
      <div className={ `Loading ${this.props.isVisible ? 'Loading--visible ' : ''}center-contents-bidirectionally` }>
        <FontAwesomeIcon className="Loading__icon" icon={ faSpinner } />
        <span className="Loading__text screen-readers-only">Loading…</span>
      </div>
    );
  }
}

export default Loading;
