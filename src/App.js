import React from 'react';
import './App.css';
import SignUp from "./components/signup/SignUp.js"
import LogIn from "./components/login/LogIn.js";
import AuthService from './services/AuthService.js';
import NavBar from './components/navbar/navBar.js';

class App extends React.Component{


  constructor(props){
    super(props);
    this.state={
      listOfAllIngrediants:[],
      currentlyLoggedIn: null,
      signupShowing: false,
      loginShowing: false,
    }

    this.service = new AuthService();
  }

  
  getAllIngrediants =()=>{
    
  }




  getCurrentlyLoggedInUser = () =>{
    this.service.currentUser()
    .then((theUser)=>{
      this.setState({currentlyLoggedIn: theUser})
    })
    .catch(()=>{
      this.setState({currentlyLoggedIn: null})
    })
  }


  toggleForm = (whichForm) =>{

    let theForm;
  
    if(whichForm === "signup"){
      theForm = 'signupShowing';
      this.setState({[theForm]: !this.state[theForm],loginShowing:false})
    
    } else {
      theForm = 'loginShowing';
      this.setState({[theForm]: !this.state[theForm], signupShowing:false})
    }
  
  }

  cancelBtn =()=>{
    this.setState({
      signupShowing: false,
      loginShowing: false,
    })
  }

  componentDidMount() {
    // this.getAllProjects();
    this.getCurrentlyLoggedInUser();
  }



  render(){
    return (
      <div>
        <NavBar 
          theUser = {this.state.currentlyLoggedIn} 
          pleaseLogOut = {()=> this.service.logout()}
          toggleForm = {this.toggleForm}
          getUser = {this.getCurrentlyLoggedInUser}
        />

        {this.state.signupShowing &&
          <SignUp getUser = {this.getCurrentlyLoggedInUser}
            signupShowing = {this.signupShowing}
            toggleForm={this.toggleForm}
            cancelBtn={this.cancelBtn}/>
        }
        {this.state.loginShowing &&
          <LogIn getUser = {this.getCurrentlyLoggedInUser} 
            toggleForm={this.toggleForm}
            cancelBtn={this.cancelBtn}/>
        }
      </div>
    );
  }
}

export default App;
