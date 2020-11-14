import React, {useState, useContext} from 'react'
import FieldSelect from "../Forms/FieldSelect"
import {GameDataContext} from "../../Contexts/GameContext"
import { Switch } from '@material-ui/core';
function ChartBuilder(){

    const {genres, platforms} = useContext(GameDataContext)
    const [genre, setGenre] = useState('')
    const [platform, setPlatform] = useState('')
    const [chartType, setType] = useState('')

    const handleType = (event, newType) => {
        setType(newType);
      };

    return(
        <div>
            <p>{chartType}</p>

            <FieldSelect fields={genres} setField={setGenre} />
            <FieldSelect fields={platforms} setField={setPlatform} />
        </div>
    )
}

export default ChartBuilder