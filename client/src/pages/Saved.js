import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Navigation from '../components/Navigation'



export class Saved extends Component {
 render() {
  let {_id} = this.props.match.params;
   return(
     
    <React.Fragment>
     
     </React.Fragment>
   )
 }
}

export default Saved;


{/* <React.Fragment>
        <Navigation /> */}
        
        {/* <Jumbotron fluid bg={'dark'} color={'light'} pageTitle={'Viewing Saved Movies'} />
        <div className="container-fluid"> */}

              {/* <Row>
                {!this.state.movieList.length
                  ? ''
                  : this.state.movieList.map(movie => {
                      return (
                        <Col key={movie._id} md={6}>
                          <Card title={movie.title} image={movie.image ? movie.image : undefined}>
                            <p>{movie.description}</p>
                            <button
                              onClick={() => this.handleRemoveMovie(movie._id)}
                              className="btn btn-danger btn-sm">
                              Remove Movie
                            </button>
                          </Card>
                        </Col>
                      );
                    })}

          </Row>      
        
      </React.Fragment> */}