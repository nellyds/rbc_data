import React from 'react'

import { useHistory } from "react-router-dom";
import { PageHeader } from "../Styles/StyledComponents"
function Projects(){
    const history = useHistory();
const goTo = (event) =>{
    history.push('/' +event.target.id)
  } 
  const pages = [{
      id: 'covid', name: 'US Covid Data',
  },
{ id: 'police', name: 'Police Shootings',},
// { id: 'gameSales', name: 'Game Sales'},
{id: 'homicides', name: 'Global Homicide Trends' },
{id: 'cfp', name: 'Carbon Foot Print vs. GDP'},
// {id: 'transit', name: 'Transit'},
{id: 'kwh', name: 'Kilowatt Hour Usage'}
]
    return(
        <div>
            <PageHeader>Data Visualizations</PageHeader>
            {pages.map((d)=>
                <p key={d.id} id={d.id} onClick={goTo}> {d.name} </p>
            )
}
        </div>
    )    
}

export default Projects