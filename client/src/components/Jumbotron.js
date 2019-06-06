import React from 'react';
import { NavLink } from 'react-router-dom';

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


    // <div>
    //   <Navbar color="faded" expand="md" dark>
    //     <NavbarBrand href="/" className="mr-auto">
    //       Movie-Mate
    //     </NavbarBrand>
    //       <Nav className="ml-auto" navbar>
    //         <NavItem>
    //         <a 
    //         className="nav-link" href="http://localhost:3001/auth/google">
    //            <button>Login</button>
    //           </a>
    //         </NavItem>
    //       </Nav>
    //   </Navbar>
    // </div>
  );
};
export default Jumbotron;


