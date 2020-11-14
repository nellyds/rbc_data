import React, {useContext, useState} from 'react'
import {GameDataContext} from "../Contexts/GameContext"
import PublisherTreeMap from "../Components/GameSales/PublisherTreeMap"
import FieldSelect from "../Components/Forms/FieldSelect"
function GameSales(){

    const {topPublishers, dataReady} = useContext(GameDataContext)
    const [publishers, setPublishers] = useState([])
    const [range, setRange] = useState(1)
    const [salesRange, setSalesRange] = useState(1)
    const buildChart= async () =>{

        await setPublishers(topPublishers.slice(0,range))
    }
    console.log(topPublishers)
    console.log(dataReady)
    return(
        <div>


    
            { dataReady && topPublishers.length > 40 ?
            <div>
                            <p  onClick={buildChart}>Build Chart</p>
    <p>{range}</p>
                <FieldSelect fields={[5,20,50,100]} setField={setRange}/>
            <PublisherTreeMap data={publishers} />
            <FieldSelect fields={[1,2,3,4,5]}  setField={setSalesRange}/>
            </div>
            : <div>
                <p>Data not ready</p>
                </div>
}
        </div>
    )
}
export default GameSales