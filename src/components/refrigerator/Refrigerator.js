import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';

 class Refrigerator extends Component{


    addNewItem = (e)=>{
        console.log('0-0-0-0-0-0-',e.target.name)
        console.log('-=-=-=-=-',this.props.theUser._id)
        axios.post("http://localhost:5000/create-item",{name: e.target.name,}, {withCredentials: true})
        .then(()=>{
            console.log('success create')
            this.props.getMyIngredients();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    deleteItem = (theID)=>{
        axios.post('http://localhost:5000/delete-item/'+theID)
        .then(()=>{
            console.log('success delete')
            this.props.getMyIngredients();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    showAllIngredients = ()=>{
        return this.props.allTheIngredients.map((eachIngredient)=>{
            return(
                <li>
                    <button className='eachIngredient' onClick={this.addNewItem} name={eachIngredient}>{eachIngredient}</button>
                </li>
            )
        })
    }

    showMyIngredients = ()=>{
        console.log('hihi')
        return this.props.MyIngredients.map((eachIngredient)=>{
            return(
                    <li className="eachMyIngredient">
                    <span>{eachIngredient.name}</span>
                    <button className="delete-btn" onClick={()=>{this.deleteItem(eachIngredient._id)}}>
                        <img src="/img/delete-button.png"/>
                    </button>
                    </li>
            )
        })
    }
    
            
    render(){
                
        if(this.props.ready && this.props.mylistShowing){
            return(
                <div className="Ingredient-page">
                    <div>
                        <ul className="IngredientsList">
                            {this.showAllIngredients()}
                        </ul>
                    </div>
                    <div className='MyIngredientsList'>
                        <h1>Ingredients I Have</h1>
                        {this.showMyIngredients()}
                    </div>
                    
                </div>
            )
        }
        else if(this.props.ready){
            return(
                <div>
                    {this.showAllIngredients()}
                </div>
            )
        }
        else {
            return(
                <h1>Loading...</h1>
            )
        }
    }

}

export default Refrigerator; 