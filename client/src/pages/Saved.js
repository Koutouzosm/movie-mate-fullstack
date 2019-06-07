import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Col from '../components/Col';
import Row from '../components/Card';
import Card from '../components/Card';
import { searchTmdb, saveMovie, recMovies, removeMovie, getSavedMovies } from '../utils/API';






export class Saved extends Component {

  state = {
    movieList: []
  };

  componentDidMount() {
    this.handleGetSavedMovies();
  }

  handleGetSavedMovies = () => {
    getSavedMovies()
      .then(({data: movieList}) => {
        this.setState({ movieList });
      })
      .catch(err => console.log(err));
  }

  // handleRemoveBook = (bookId) => {
  //   removeBook(bookId)
  //     .then(this.handleGetSavedBooks)
  //     .catch(err => console.log(err));
  // }



  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <Navigation />
        <Row>
                {this.state.movieList.length === 0
                  ? <div>Please save some movies</div>
                  : this.state.movieList[0].movies.map(movie => {
                    console.log(movie)
                      return (
                        <Col key={movie.movieId} md={6}>
                          <Card title={movie.title} image={movie.image ? movie.image : undefined}>
                            <p>{movie.plot}</p>
                            {/* <button
                              onClick={() => this.handleRemoveBook(book._id)}
                              className="btn btn-danger btn-sm">
                              Remove Book
                            </button> */}
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