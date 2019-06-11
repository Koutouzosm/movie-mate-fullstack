import React from 'react';


 let loginPath = (process.env.NODE_ENV === "production") ? "https://movie-mate-fullstack.herokuapp.com/auth/google" : "http://localhost:3001"

const jumboStyle = {
  backgroundImage: `url(${images/moviemate.png})`,
  backgroundSize: "cover"
}

const Jumbotron = () => {
  return (
    <div
      className="jumbotron text-center" style={jumboStyle}>
      <h1>Movie-Mate</h1>
      <p>Please sign in with Google to access</p>
      <a
        className="nav-link"
        as='a' href="https://movie-mate-fullstack.herokuapp.com/auth/google">
        <button type="button" className="btn btn-gplus btn-danger"><i className="fab fa-google-plus-g pr-1">Google</i></button>
      </a>
    </div>

  );
};

export default Jumbotron;


