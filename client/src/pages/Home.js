import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Row from '../components/Row';
import Col from '../components/Col';
import Card from '../components/Card';
import Div from '../components/Div'
import {withFirebase} from '../components/Firebase/index'
import { searchTmdb, saveMovie, recMovies, removeMovie, getSavedMovies } from '../utils/API';
import jumbotron from '../components/Jumbotron';

class Home extends Component {
  

 

  render() {
    return (
      <React.Fragment>
        <Jumbotron />
      </React.Fragment>
    );
  }
}

// const Home = withFirebase(HomeBase)

export default Home;