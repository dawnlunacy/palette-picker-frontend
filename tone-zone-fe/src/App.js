import React, { Component } from 'react';
import './App.scss';
import { Header } from '../src/containers/Header/Header'
// import PropTypes from 'prop-types';


export class App extends Component {

  async componentDidMount() {

  }

  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
} 

export default App;

 // Component.propTypes = {
  //   prop1: PropTypes.array.isRequired,
  //   prop2: PropTypes.any,
  //   prop3: PropTypes.func.isRequired,
  //   prop4: PropTypes.bool,
  //   prop5: PropTypes.string.isRequired,
  //   prop6: PropTypes.number
  // }