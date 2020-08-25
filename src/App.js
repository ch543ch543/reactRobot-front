import React,{ Component } from 'react';
import Particles from 'react-particles-js'
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank'; 

    const particlesss =  {
          particles:{
            number:{
              value: 60,
              density: {
                enable: true,
                value_area: 500
              }
            }
          }
        }  

    const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name:'',
        email: '',
        entries: 0, 
        joined: '' 
      }
  } 
  

class App extends Component{
  constructor(){
    super();
    this.state = initialState
  }

   calculateFaceLocation = (data) => {
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage') /*get the element through ID 找出被輸入圖片的一些特性*/
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
     this.setState({box: box})
     console.log(box);
   }

  onInputChange = (event) => {
     this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}) /*set imageURL as input*/;
      fetch( 'https://stark-cliffs-33238.herokuapp.com/imageurl', { //heroku設定完成後就改成heroku的emdpoint
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input : this.state.input,
        })
      })
      .then(response => response.json)
      .then( 
        response => {
          if(response) {
            fetch( 'https://stark-cliffs-33238.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id,
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState( Object.assign (this.state.user, {entries: count}))
            })
            .catch(console.log )
          }
        this.displayFaceBox(this.calculateFaceLocation(response))
        }
      )
        .catch(err => console.log(err));
 }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState ({isSignedIn: true})
    } else if (route === 'signout') {
      this.setState(initialState)
    } 
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState( {user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries, 
        joined: data.joined
    }})
  } 
 
  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
    return(     
      <div className = "App">        
        <Particles className = 'particles' params={particlesss} />
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} />
        { route === 'home' 
        ? <div>
            <Logo />
            <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
            <ImageLinkForm  onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
            <FaceRecognition imageURL = {imageUrl} box = {box}/>
          </div> 
          : (
            route === 'signin' || route ==='signout'
            ? <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
            : <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
          )
        }
      </div>
    )
  };
}       
export default App;