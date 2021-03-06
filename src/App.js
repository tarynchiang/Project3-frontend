import React from 'react';
import './App.css';
import {Route, Link, Switch} from 'react-router-dom';
import SignUp from "./components/signup/SignUp.js"
import LogIn from "./components/login/LogIn.js";
import Refrigerator from "./components/refrigerator/Refrigerator.js";
import CocktailDetails from "./components/cocktaildetails/CocktailDetails.js";
import Homepage from "./components/homepage/homePage.js";
import AuthService from './services/AuthService.js';
import NavBar from './components/navbar/navBar.js';
import axios from 'axios';

class App extends React.Component{


  constructor(props){
    super(props);
    this.state={
      listOfAllIngredients:[],
      myListOfIngredients:[],
      currentlyLoggedIn: null,
      signupShowing: false,
      loginShowing: false,
      ready: false,
      mylistShowing:false,
    }

    this.service = new AuthService();
  }

  
  getAllIngredients =()=>{
    axios.get('http://localhost:5000/ingredients-list')
    .then((ingredients)=>{
      // console.log('ingredients from backend=========',ingredients.data)
      this.setState({listOfAllIngredients: ingredients.data, ready:true})
    })
  }

  getMyIngredients = () =>{
    axios.get("http://localhost:5000/ingredient-you-have", {withCredentials: true})
    .then((ingredients)=>{
      console.log('my ingredients<<<<<<',ingredients.data)
        this.setState({myListOfIngredients: ingredients.data, mylistShowing:true})
    })
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
    this.getMyIngredients();
    this.getCurrentlyLoggedInUser();
    this.getAllIngredients();
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

        <Switch>
          <Route exact path="/refrigerator" render ={(props)=> <Refrigerator
            {...props} 
            allTheIngredients ={this.state.listOfAllIngredients}
            MyIngredients = {this.state.myListOfIngredients}
            getMyIngredients = {this.getMyIngredients}
            ready = {this.state.ready}
            mylistShowing = {this.state.mylistShowing}
            getData = {this.getAllIngredients}
            theUser = {this.state.currentlyLoggedIn} 
            />} />

          <Route exact path="/details/:id" render ={(props)=> <CocktailDetails
            {...props} 
            allTheIngredients ={this.state.listOfAllIngredients}
            MyIngredients = {this.state.myListOfIngredients}
            getMyIngredients = {this.getMyIngredients}
            ready = {this.state.ready}
            mylistShowing = {this.state.mylistShowing}
            getData = {this.getAllIngredients}
            theUser = {this.state.currentlyLoggedIn} 
            />}/>
          
        </Switch>
      </div>
    );
  }
}

export default App;
