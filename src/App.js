import React from "react";
import Home from "./components/Home";
import Form from './components/Form';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => (
          <Redirect to="/home"/>
        )}/>
        <Route path="/home" component={Home} />
        <Route path="/form" exact component={Form} />
      </Router>
    </div>
  );
}
