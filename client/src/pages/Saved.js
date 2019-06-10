import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Col from '../components/Col';
import Row from '../components/Card';
import Card from '../components/Card';
import { searchTmdb, saveMovie, recMovies, removeMovie, getSavedMovies, getUsers } from '../utils/API';






export class Saved extends Component {

  state = {
    movieList: [],
    userList: []
  };

  componentDidMount() {
    this.handleGetSavedMovies();
    this.handleGetUsers();
  }

 

  handleGetSavedMovies = () => {
    getSavedMovies()
      .then(({data: movieList}) => {
        this.setState({ movieList });
      })
      .catch(err => console.log(err));
  }

  handleGetUsers = () => {
    getUsers()
      .then(({data: userList}) => {
        console.log(userList)
        this.setState({ userList});
      })
      .catch(err => console.log(err))
  }

  handleRemovie = (movieId) => {
    removeMovie(movieId)
      .then(({data}) => {
        console.log(data);
        this.handleGetSavedMovies();
      })
      .catch(err => console.log(err));
  }

  



  render() {
    console.log(this.state.userList)
    return (
      <React.Fragment>
        <Navigation />
        <Row>
                {this.state.movieList.length === 0
                  ? <div>Please save some movies</div>
                  : this.state.movieList[0].movies.map(movie => {
                      return (
                        <Col key={movie.movieId} md={6}>
                          <Card title={movie.title} image={movie.image ? movie.image : undefined}>
                            <p>{movie.plot}</p>
                            <button
                              onClick={() => this.handleRemovie(movie.movieId)}
                              className="btn btn-danger btn-sm">
                              Remove Movie
                            </button>
                          </Card>
                        </Col>
                      );
                    })}

          </Row>
        </React.Fragment>
        )
      }   
    }  
       export default Saved;