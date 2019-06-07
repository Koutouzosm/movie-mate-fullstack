import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';



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