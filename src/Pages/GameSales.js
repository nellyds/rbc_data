import React, {useContext, useState} from 'react'
import {GameDataContext} from "../Contexts/GameContext"
import PublisherTreeMap from "../Components/GameSales/PublisherTreeMap"
function GameSales(){

    const {topPublishers} = useContext(GameDataContext)
    const [publishers, setPublishers] = useState()
    return(
        <div>
            <p onClick={topPublishers.pop()} >Games Sales</p>
            {topPublishers.length > 20 ?
            <PublisherTreeMap data={topPublishers} />
            : <div>
                <p>Data not ready</p>
                </div>
}
        </div>
    )
}
export default GameSales