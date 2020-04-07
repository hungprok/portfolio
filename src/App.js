import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './Pages/HomePage';
import Projectspage from './Pages/Projectspage';
import Navbar from './Components/Navbar';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

function App() {

  let scrollMore = (e) => {
    scroll.scrollMore(-500, {
      duration: 500,
      delay: -500,
      smooth: "easeOutCirc",
    });
    console.log('hahaha')
  }

  return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/projects' component={Projectspage} />
        </Switch>
      </Router>
  );
}

export default App;
