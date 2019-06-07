import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Saved from "./pages/Saved";
import Home from './pages/Home';
import Search from './pages/Search';


function App() {  
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/saved" component={Saved} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
