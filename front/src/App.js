import React from 'react';
import './App.css';
import Signin from './Components/Signin/Signin.js';
import Register from './Components/Register/Register';
import Main from './Components/video/Main';
import Navigation from './Components/Navigation/Navigation';
import Gallery from './Components/Gallery/Gallery.js';
import Home from './Components/Home/Home.js';
import About from './Components/About/About.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Watch: [],
      isLoggedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
      },
    };
  }
  
  loadUser = (data) => {
    this.setState({
      isLoggedIn: true,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
      },
    });
  };

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
    const message = 'Changes you made may not be saved. Are you sure you want to leave?';
    e.returnValue = message;
    if (window.confirm(`${message}Press 'Cancel' to stay on this page.`)) {
      window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ Watch: users }));
  }

  render() {
    if (this.state.Watch.length === 0) {
      return (
        <div className="main">
          <div className="pl">
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__dot"></div>
            <div className="pl__text">Loading…</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={this.state.isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/signin" />} />
              <Route path="/home" element={<Home name={this.state.user.name} />} />
              <Route path="/Navigation" element={<Navigation />} />
              <Route path="/About" element={<About />} />
              <Route  path="/gallery" element={<Gallery  name={this.state.user.name} />} />
              <Route path="/video" element={<Main />} />
              <Route path="/signin" element={<Signin loadUser={this.loadUser} />} />
              <Route path="/register" element={<Register loadUser={this.loadUser} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </div>
      );
    }
  }
}

export default App;