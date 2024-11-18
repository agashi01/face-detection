/* eslint-disable no-dupe-class-members */

import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Navigation from './Navigation';
// import Clarifai from 'clarifai';
import Logo from './Logo.js'
import ImageLinkForm from './ImageLinkForm';
import FaceRecogninition from './FaceRecognition';
import Rank from './Rank';
import Register from './Register';
import SignIn from './SignIn';
// import Particles from "react-particles-js";

// const particleOptions = {
//   "fps_limit": 28,
//   "particles": {
//     "collisions": {
//       "enable": false
//     },
//     "number": {
//       "value": 200,
//       "density": {
//         "enable": false
//       }
//     },
//     "line_linked": {
//       "enable": true,
//       "distance": 30,
//       "opacity": 0.4
//     },
//     "move": {
//       "speed": 1
//     },
//     "opacity": {
//       "anim": {
//         "enable": true,
//         "opacity_min": 0.05,
//         "speed": 1,
//         "sync": false
//       },
//       "value": 0.4
//     }
//   },
//   "polygon": {
//     "enable": true,
//     "scale": 0.5,
//     "type": "inline",
//     "move": {
//       "radius": 10
//     },
//     "url": "/small-deer.2a0425af.svg",
//     "inline": {
//       "arrangement": "equidistant"
//     },
//     "draw": {
//       "enable": true,
//       "stroke": {
//         "color": "rgba(255, 255, 255, .2)"
//       }
//     }
//   },
//   "retina_detect": false,
//   "interactivity": {
//     "events": {
//       "onhover": {
//         "enable": true,
//         "mode": "bubble"
//       }
//     },
//     "modes": {
//       "bubble": {
//         "size": 6,
//         "distance": 40
//       }
//     }
//   }
// }

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'home',
      user: {},
      error: '',
      clicked:false

    }
  }

  componentDidMount() { 
    document.title = "Face Detection"; // Replace with your desired title
  }

  calculateFaceLocation = (data, i) => {
    console.log(i)
    const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
    console.log(clarifaiFace)
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState(prevState => {
      return { box: [...prevState.box, box] }
    })
  }

  onInput = (event) => {
    this.setState({ input: event.target.value })
  };

  onButtonClick = () => {
    this.setState({ clicked:!this.state.clicked,imageUrl: this.state.input });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageUrl !== this.state.imageUrl|| prevState.clicked!==this.state.clicked) {
      axios.post("http://localhost:4000/clarifai", { imageUrl: this.state.imageUrl })
        .then(result => {
          if (result.data.status.code !== 10000) {
            console.log('hi')
            throw new Error(result.data.status.description);
          }
          if (result.data.outputs[0].data.regions) {
            for (let i = 0; i <= result.data.outputs[0].data.regions.length; i++) {
              console.log(result.data.outputs[0].data.regions)

              this.displayFaceBox(this.calculateFaceLocation(result.data, i))
            }
          }
          console.log('error not here')
          this.setState({ error: '' })

        })
        .catch(error => {

          this.setState({ error: 'Try again or change image url' })

          console.log(error)
        });

    }

  }

  onRouteChange = (route) => {
    this.setState({route})
  }

  removeUser = () => {
    this.setState({ user: {} })
  }

  loadUser=(user)=>{
    this.setState({user})
  }
  render() {
    return (
      <div>
        {/* <Particles params={particleOptions} /> */}

        <Navigation route={this.state.Route} removeUser={this.removeUser} onRouteChange={this.onRouteChange} />
        <Logo />

        {this.state.route === 'home'
          ? <div>
            <Rank user={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              error={this.state.error}
              onInputChange={this.onInput}
              onButtonClick={this.onButtonClick}
            />
            <FaceRecogninition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
          : (
            this.state.route === 'signIn' ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
              <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}
export default App

