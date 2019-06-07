import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Row from '../components/Row';
import Col from '../components/Col';
import Card from '../components/Card';
import Div from '../components/Div';
import {withFirebase} from '../components/Firebase/index'
import { searchTmdb, saveMovie, recMovies, removeMovie, getSavedMovies } from '../utils/API';




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

  // componentDidMount() {
  //   this.props.firebase.chat().on('value', snapshot => {
  //     this.setState({currentChat: Object.values(snapshot.val())})
  //   }) 
  // }


 

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
                <Col className="text-center" md={4}>
                {
                  !Object.keys(this.state.movieData).length ? "Search For A Movie To Begin" : (
                          <Card className="text-center" title={this.state.movieData.title} image={this.state.movieData.image} vote={this.state.movieData.vote} movieId={this.state.movieData.movieId}>
                            <p>
                              {this.state.movieData.plot}
                            </p>
                            {/* <button 
                              disabled={this.state.savedMovieIds.includes(movie.movieId) ? true : undefined}
                              onClick={() => this.handleSaveMovie(movie.movieId)}
                              className="btn btn-success btn-sm">
                              Save Movie
                            </button> */}
                          </Card>
                  )
                }
                </Col>
                <Col md={8}>
                  <Div>
                  <Row>
                    {
                      this.state.movieRec.map(movie => (
                        <Col key={movie.id} md={3}> 
                        <Card secondSearch reRun={this.reRun} className="text-center" title={movie.title} image={movie.poster_path} vote={movie.vote_average} id={movie.id}>
                            {/* <p>
                              {movie.overview}
                            </p> */}
                            {/* <button 
                              disabled={this.state.savedMovieIds.includes(movie.movieId) ? true : undefined}
                              onClick={() => this.handleSaveMovie(movie.movieId)}
                              className="btn btn-success btn-sm">
                              Save Movie
                            </button> */}
                          </Card>
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

// const Home = withFirebase(HomeBase)

export default Search;