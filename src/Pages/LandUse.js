import React, {useContext, useState, useEffect} from 'react'
import CropLandUse from "../Components/LandUse/CropLandUse"
import {LandUseContext} from "../Contexts/LandUseContext"
import FieldSelect from "../Components/Forms/FieldSelect"
import CropBar from "../Components/LandUse/CropBar"
import Slider from '@material-ui/core/Slider';

export default function LandUse() {

    const {years, crops, sortedData} = useContext(LandUseContext)
    const [year, setYear] = useState(1965)
    const [seconds, setSeconds] = useState(0);
    const [selectYear, setSelectYear] = useState('')
    const incrementYear =  () =>{
       
        let newYear = parseInt(year) < parseInt(years.slice(-2)[1]) ? parseInt(year) + 1 : parseInt(year) +0
        console.log(newYear)
        setYear(newYear)   
             

    }

    const handleYear = (event, newValue) =>{
        setYear(newValue)
    }
    
    return (
        
        <div>{sortedData.length > 2 && years.length > 0
            ?
            <div>
                <Slider
        defaultValue={1990}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={handleYear}
        step={1}
        marks={true}
        min={1965}
        max={2015}
      />
      <p>{year} </p>
            <FieldSelect fields={years} setField={setYear} />
            <CropLandUse year={year} years={years} data={sortedData} />
            <CropBar data={sortedData} year={year} />
            </div>
            :
            <p />
            }

        </div>
    )
}
