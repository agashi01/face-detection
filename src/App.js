
import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
// import Clarifai from 'clarifai';
import Logo from './Logo.js'
import ImageLinkForm from './ImageLinkForm';
import FaceRecogninition from './FaceRecognition';
import Rank from './Rank';
import Register from './Register';
import SignIn from './SignIn';
// import Particles from "react-particles-js";

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'b5215c2b5ce14f329a62d141188c94c7';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';



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
      ImageUrl: '',
      box: '',
      Route: 'signIn'
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
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
    this.setState({ box })
  }


  onInput = (event) => {
    this.setState({ input: event.target.value })
  };

  onButtonClick = () => {
    console.log(this.state)
    this.setState({ ImageUrl: this.state.input });
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        (this.displayFaceBox(this.calculateFaceLocation(result)))
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    this.setState({ Route: route })
  }

  render() {
    return (
      <div>
        {/* <Particles params={particleOptions} /> */}

        <Navigation route={this.state.Route} onRouteChange={this.onRouteChange} />
        <Logo />
        
        {this.state.Route === 'home'
          ? <div>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInput}
              onButtonClick={this.onButtonClick}
            />
            <FaceRecogninition
              box={this.state.box}
              ImageUrl={this.state.ImageUrl}
            />
          </div>
          : (
            this.state.Route === 'signIn' ?
              <SignIn onRouteChange={this.onRouteChange} />
              :
              <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}
export default App

