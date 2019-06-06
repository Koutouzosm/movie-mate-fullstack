import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';



const USER_QUERY = gql`
 query UserQuery{
   user{
       googleid
       age
       gender
       displayName
       movies{
         movie
       }
   }
 }
`

export class Saved extends Component {
 render() {
   let {_id} = this.props.match._id
   return(
    <React.Fragment>
     <div>
       <h1 className='display-4 my-3'>Saved Movies</h1>

       <Query query={USER_QUERY} variables={{ _id }}>
         {
           ({ loading, error, data }) => {
             if(loading) return <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
             if(error) console.log(error)

             const { googleid, gender, age, displayName, movie:{
               movies} } = data.user

             return <React.Fragment>

               {
                 <h1>{movies}</h1>
               }
             </React.Fragment>
           }
         }
       </Query>
     </div>
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