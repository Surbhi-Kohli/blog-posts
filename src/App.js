import React from 'react';
import {NavLink,Route,Switch} from "react-router-dom";
import './App.css';
import HomePage from "./Components/HomePage/HomePage";
import Posts from "./Components/Posts/Posts";

function App() {
 
  return (
    <div className="App">
      <header className="App-header">
     
        <NavLink
          className="App-link"
          to="/"
          exact
          activeClassName="active-link"
        >
          Home Page
        </NavLink>
        <NavLink 
          activeClassName="active-link" className="App-link" to="/Posts?id=1&skip=0&limit=10">Posts</NavLink>
        
      </header>
      <div style={{marginTop:'50px'}}>
      <Switch>
      <Route path='/Posts/:id?/:comment?'>
      <Posts/>
      </Route>
      <Route path="/" >
      <HomePage/>
      </Route>
      </Switch>
      </div>
    </div>
  );
}

export default App;
