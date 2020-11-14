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
  const pages = [{
      id: 'covid', name: 'US Covid Data',
  },
{ id: 'police', name: 'Police Shootings',},
{ id: 'gameSales', name: 'Game Sales'}]
    return(
        <div>
            {pages.map((d)=>
                <p key={d.id} id={d.id} onClick={goTo}> {d.name} </p>
            )
}
        </div>
    )    
}

export default Projects