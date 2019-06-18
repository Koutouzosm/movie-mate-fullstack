import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Row from '../components/Row';
import Col from '../components/Col';
import Card from '../components/Card';
import Div from '../components/Div';
import Reccard from '../components/Reccard'
import { searchTmdb, saveMovie, recMovies } from '../utils/API';




class Search extends Component {
  state = {
    searchTerm: '',
    movieList:[],
    movieData: {},
    savedMovieIds: [],
    movieId: "",
    movieRec: [],
    currentChat: []
  }; 

  reRun = (title) => {
    this.setState({
      searchTerm: title
    }, this.mainSearch)
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.mainSearch();
  }

  // Main function to search for a movie
  mainSearch = () => {
    searchTmdb(this.state.searchTerm)
      .then(({ data: movieData }) => {
        console.log(movieData);
        this.setState({
          movieData: {
            title: movieData.results[0].title,
            movieId: movieData.results[0].id,
            plot: movieData.results[0].overview,
            image: movieData.results[0].poster_path,
            vote: movieData.results[0].vote_average
          }
        }, this.recSearch);
      })
      .catch(err => console.log(err));
      this.setState({searchTerm: ""})
  };

  
  recSearch = () => {
    console.log(this.state.movieData.movieId);
    recMovies(this.state.movieData.movieId)
      .then(({ data: movieRec }) => {
        console.log(movieRec);
        this.setState({movieRec: movieRec.results
        })
      })
      .catch(err => console.log(err));
  };

  handleSaveMovie = () => {
    console.log(this.state.movieData);
    // this.state.movieData 
    saveMovie(this.state.movieData).then((res) => {
    }).catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    return (
      <React.Fragment>
        <Navigation 
        search
        handleInputChange={this.handleInputChange}
        searchTerm={this.state.searchTerm}
        mainSearch={this.mainSearch}
        />
        <div className="container-fluid">

              <Row>
                <Col className="text-center" md={6}>
                {
                  !Object.keys(this.state.movieData).length ? "Search For A Movie To Begin" : (
                          <Card className="text-center" title={this.state.movieData.title} image={this.state.movieData.image} vote={this.state.movieData.vote} movieId={this.state.movieData.movieId}>
                            <p>
                              {this.state.movieData.plot}
                            </p>
                            <button 
                              onClick={this.handleSaveMovie}
                              className="btn btn-success btn-sm">
                              Save Movie
                            </button>
                          </Card>
                  )
                }
                </Col>
                <Col md={6}>
                  <Div>
                  <Row>
                    {
                      this.state.movieRec.map(movie => (
                        <Col key={movie.id} md={3}> 
                        <Reccard secondSearch reRun={this.reRun} className="text-center" title={movie.title} image={movie.poster_path} vote={movie.vote_average} id={movie.id}>
                          </Reccard>
                          </Col>
                      ))
                    }
                    </Row>
                  </Div>
                </Col>
              </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;