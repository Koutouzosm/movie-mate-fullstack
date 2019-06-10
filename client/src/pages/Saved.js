import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Col from '../components/Col';
import Row from '../components/Row';
import Card from '../components/Card';
import { searchTmdb, saveMovie, recMovies, removeMovie, getSavedMovies, getUsers } from '../utils/API';
import Div from '../components/Div';
import Matchcard from '../components/Matchcard'






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
      .then(({ data: movieList }) => {
        this.setState({ movieList });
      })
      .catch(err => console.log(err));
  }

  handleGetUsers = () => {
    getUsers()
      .then(({ data: userList }) => {
        console.log(userList)
        this.setState({ userList });
      })
      .catch(err => console.log(err))
  }

  handleRemovie = (movieId) => {
    removeMovie(movieId)
      .then(({ data }) => {
        this.handleGetSavedMovies();
      })
      .catch(err => console.log(err));
  }





  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className="container-fluid">
          <Row>
            <div className="col-12 col-md-6">
            {this.state.movieList.length === 0
              ? <div>Please save some movies</div>
              : this.state.movieList[0].movies.map(movie => {
                return (

                    <Card key={movie.movieId} title={movie.title} image={movie.image ? movie.image : undefined}>
                      <p>{movie.plot}</p>
                      <button
                        onClick={() => this.handleRemovie(movie.movieId)}
                        className="btn btn-danger btn-sm">
                        Remove Movie
                            </button>
                    </Card>
                );
              })}
            </div>
            <div className="col-12 col-md-6">

              {this.state.userList.length === 0
                ? <div>You currently have no matches</div>
                : this.state.userList.map(match => {
                  return (
                      <Matchcard key={match.userId} title={match.displayName} image={match.thumbnail ? match.thumbnail : undefined}>
                        {/* <button
                          onClick={() => this.handleRemovie(movie.movieId)}
                          className="btn btn-danger btn-sm">
                          Remove Movie
                            </button> */}
                      </Matchcard>
                  );
                })}
                </div>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}


export default Saved;