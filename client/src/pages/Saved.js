import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import Row from '../components/Row';
import Form from '../components/Form'
import Matchcard from '../components/Matchcard';
import {withFirebase} from '../components/Firebase/index'
import { searchTmdb, saveMovie, recMovies, removeMovie, getSavedMovies, getUsers, getMe } from '../utils/API';


export class SavedBase extends Component {

  state = {
    movieList: [],
    userList: [],
    me: [],
    sender: '',
    receiver: '',
    chat: [],
    entireChat: []
  };

  componentDidMount() {
    this.handleGetSavedMovies();
    this.handleGetUsers();
    this.handleGetMe();
  //   this.props.firebase.chat().on('value', snapshot => {
  //     if (snapshot.val()) {
  //       this.setState({entireChat: snapshot.val()})
  //     }
  // })
}

  handleGetMe = () => {
    getMe()
      .then(res => {
        this.setState({ me: res.data, sender: res.data[0].displayName })
      })
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

  setReceiver = (event) => {
    this.setState({receiver: event.target.value}, () => this.getCurrentChat())
  }

  getCurrentChat = () => {
      // let currentChat = Object.values(this.state.entireChat).filter(
      //   message =>
      //     message.sender === this.state.sender &&
      //     message.receiver === this.state.receiver
      // );
      // this.setState({ chat: currentChat });
      this.props.firebase.chat().on('value', snapshot => {

        let yourMessages = Object.values(snapshot.val()).filter(message => {

          return message.sender === this.state.sender && message.receiver === this.state.receiver || message.sender === this.state.receiver && message.receiver === this.state.sender
        })

      this.setState({chat: yourMessages})
    })

  }
  
  



  render() {
    console.log(this.state)
    console.log(this.props)
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
                        <button
                        value={match.displayName}
                          onClick={(e) => this.setReceiver(e)}
                          className="btn btn-danger btn-sm">
                          Chat with {match.displayName}
                            </button>
                      </Matchcard>
                  );
                })}
                </div>
          </Row>
          <Row className="justify-content-center">
          <div className="col-12 col-md-6">
                {this.state.receiver !== '' && (
                  this.state.chat.map((message, index) => (
                    message.sender === this.state.sender ? (
                      <div className="d-flex flex-column align-items-end my-1" key={index}>
                        <div>{message.sender}</div>
                        <div>{message.timestamp}</div>
                        <div className={`badge badge-primary msgText mb-2`}>{message.message}</div>
                      </div>
                    ) : (
                      <div className="d-flex flex-column align-items-start my-1" key={message.message}>
                        <div>{message.sender}</div>
                        <div>{message.timestamp}</div>
                        <div className={`badge badge-success msgText mb-2`}>{message.message}</div>
                    </div>
                    )
                  ))
                  
                )}
                {this.state.receiver !== '' && (
                <Form sender={this.state.sender} receiver={this.state.receiver} />
                )}
            </div>

          </Row>
        </div>
      </React.Fragment>
    )
  }
}

const Saved = withFirebase(SavedBase)

export default Saved;



// import React, { Component } from 'react';
// import Navigation from '../components/Navigation';
// import Card from '../components/Card';
// import Col from '../components/Col';
// import Row from '../components/Row';
// import Form from '../components/Form';
// import Matchcard from '../components/Matchcard';
// import { withFirebase } from '../components/Firebase/index';
// import {
//   searchTmdb,
//   saveMovie,
//   recMovies,
//   removeMovie,
//   getSavedMovies,
//   getUsers,
//   getMe
// } from '../utils/API';
// import Div from '../components/Div';

// export class SavedBase extends Component {
//   state = {
//     movieList: [],
//     userList: [],
//     me: [],
//     sender: '',
//     receiver: '',
//     chat: [],
//     entireChat: []
//   };

//   componentDidMount() {
//     this.handleGetSavedMovies();
//     this.handleGetUsers();
//     this.handleGetMe();
//     //   this.props.firebase.chat().on('value', snapshot => {
//     //     if (snapshot.val()) {
//     //       this.setState({entireChat: snapshot.val()})
//     //     }
//     // })
//   }

//   handleGetMe = () => {
//     getMe().then(res => {
//       this.setState({ me: res.data, sender: res.data[0].displayName });
//     });
//   };

//   handleGetSavedMovies = () => {
//     getSavedMovies()
//       .then(({ data: movieList }) => {
//         this.setState({ movieList });
//       })
//       .catch(err => console.log(err));
//   };

//   handleGetUsers = () => {
//     getUsers()
//       .then(({ data: userList }) => {
//         console.log(userList);
//         this.setState({ userList });
//       })
//       .catch(err => console.log(err));
//   };

//   handleRemovie = movieId => {
//     removeMovie(movieId)
//       .then(({ data }) => {
//         this.handleGetSavedMovies();
//       })
//       .catch(err => console.log(err));
//   };

//   setReceiver = event => {
//     this.setState({ receiver: event.target.value }, () =>
//       this.getCurrentChat()
//     );
//   };

//   getCurrentChat = () => {
//     // let currentChat = Object.values(this.state.entireChat).filter(
//     //   message =>
//     //     message.sender === this.state.sender &&
//     //     message.receiver === this.state.receiver
//     // );
//     // this.setState({ chat: currentChat });
//     this.props.firebase.chat().on('value', snapshot => {
//       let yourMessages = Object.values(snapshot.val()).filter(message => {
//         return (
//           (message.sender === this.state.sender &&
//             message.receiver === this.state.receiver) ||
//           (message.sender === this.state.receiver &&
//             message.receiver === this.state.sender)
//         );
//       });

//       this.setState({ chat: yourMessages });
//     });
//   };

//   render() {
//     console.log(this.state);
//     console.log(this.props);
//     return (
//       <React.Fragment>
//         <Navigation />
//         <div className="container-fluid">
//           <Row>
//             <div className="col-12 col-md-6">
//               <Row>
//                 {this.state.me[0].movies.length === 0 ? (
//                   <div>Please save some movies</div>
//                 ) : (
//                   this.state.me[0].movies.map(movie => {
//                     return (
//                       <div className="col-12 col-md-4">
//                         <Card
//                           key={movie.movieId}
//                           title={movie.title}
//                           image={movie.image ? movie.image : undefined}
//                         >
//                           <p>{movie.plot}</p>
//                           <button
//                             onClick={() => this.handleRemovie(movie.movieId)}
//                             className="btn btn-danger btn-sm"
//                           >
//                             Remove Movie
//                           </button>
//                         </Card>
//                       </div>
//                     );
//                   })
//                 )}
//               </Row>
//             </div>
//             <div className="col-12 col-md-6">
//               <Row>
//                 {this.state.userList.length === 0 ? (
//                   <div>You currently have no matches</div>
//                 ) : (
//                   this.state.userList.map(match => {
//                     return (
//                       <div className="col-12 col-md-4">
//                         <Matchcard
//                           key={match.userId}
//                           title={match.displayName}
//                           image={match.thumbnail ? match.thumbnail : undefined}
//                         >
//                           <button
//                             value={match.displayName}
//                             onClick={e => this.setReceiver(e)}
//                             className="btn btn-danger btn-sm"
//                           >
//                             Chat with {match.displayName}
//                           </button>
//                         </Matchcard>
//                       </div>
//                     );
//                   })
//                 )}
//               </Row>
//             </div>
//           </Row>
//           <Row className="justify-content-center">
//             <div className="col-12 col-md-6">
//               {this.state.receiver !== '' &&
//                 this.state.chat.map((message, index) =>
//                   message.sender === this.state.sender ? (
//                     <div
//                       className="d-flex flex-column align-items-end my-1"
//                       key={index}
//                     >
//                       <div>{message.sender}</div>
//                       <div>{message.timestamp}</div>
//                       <div className={`badge badge-primary msgText mb-2`}>
//                         {message.message}
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className="d-flex flex-column align-items-start my-1"
//                       key={message.message}
//                     >
//                       <div>{message.sender}</div>
//                       <div>{message.timestamp}</div>
//                       <div className={`badge badge-success msgText mb-2`}>
//                         {message.message}
//                       </div>
//                     </div>
//                   )
//                 )}
//               {this.state.receiver !== '' && (
//                 <Form
//                   sender={this.state.sender}
//                   receiver={this.state.receiver}
//                 />
//               )}
//             </div>
//           </Row>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// const Saved = withFirebase(SavedBase);

// export default Saved;
