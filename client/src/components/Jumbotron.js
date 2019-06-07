import React from 'react';


const Jumbotron = () => {
  return (
    <div
      className="jumbotron text-center">
      <h1>Movie-Mate</h1>
      <p>Please sign in with Google to access</p>
      <a
        className="nav-link" href="http://localhost:3001/auth/google">
        <button type="button" className="btn btn-gplus btn-danger"><i className="fab fa-google-plus-g pr-1">Google</i></button>
      </a>
    </div>

  );
};
export default Jumbotron;


