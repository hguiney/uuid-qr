import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends React.Component {
  state = {
    "uuid": "",
  };

  static propTypes = {
    "match": PropTypes.object,
  };

  componentDidMount() {
    if ( this.props.match ) {
      const { params } = this.props.match;

      this.setState( {
        "uuid": params.uuid,
      } );
    }
  }

  render() {
    const uuid = ( this.state.uuid || 'no uuid' );

    return (
      <main className="App">{ uuid }</main>
    );
  }
}

export default App;
