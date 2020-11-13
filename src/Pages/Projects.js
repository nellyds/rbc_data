import React from 'react'
import { Route} from 'react-router-dom';
import PoliceShootings from "./PoliceShootings"
import USCovid from "./USCovid"
import { useHistory } from "react-router-dom";

function Projects(){
    const history = useHistory();
const goTo = (event) =>{
    console.log(event.target.id)
    history.push('/' +event.target.id)
  } 
    return(
        <div>
            <p>sdf</p>
            <p onClick={goTo} id="covid">Covid</p>
            <p onClick={goTo} id="police">Police Shootings</p>
        </div>
    )    
}

export default Projects