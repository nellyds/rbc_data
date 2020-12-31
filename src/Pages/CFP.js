import React, {useContext, useState, useEffect} from 'react'
import {CFPContext} from "../Contexts/CFPContext"
import { makeStyles } from '@material-ui/core/styles';
import FieldSelect from "../Components/Forms/FieldSelect"
import Slider from '@material-ui/core/Slider';
import CFPScatter from "../Components/CFP/CFPScatter"



export default function CFP() {

    const {compile, cfpData, gdpData, years, parsedData, popData, regionData} = useContext(CFPContext)
    const [year, setYear] = useState(2005)
    const [loading, setLoading] = useState(true)
    const [scrWidth, setScrWidth] = useState(500)
    const [fetching, setFetching] = useState(null)
    function handleResize() {
        setScrWidth(Math.floor(window.innerWidth * .8))

    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    )
    const compileChart = async() =>{
        setFetching(true)
        await compile(cfpData, gdpData, popData, years)
        setLoading(false)
    }
    const handleYear = (event, newValue) =>{
        setYear(newValue)
    }


    return (
        <div style={{width: scrWidth}}>
                            <Slider
        defaultValue={1990}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={handleYear}
        step={1}
        marks={true}
        min={2000}
        max={2015}
      />
      <p>{year} </p>
            {loading === true ? <p onClick={compileChart}>Build Chart</p>: 
            <CFPScatter 
            // data={parsedData} 
            regionData={regionData} 
            year={year}  scrWidth={scrWidth} />
            
            }
            {loading === true && fetching === true
            ?
                <p>Loading...</p>
                :
                null
        }
            {/* {regionData.length > 3
?
<CFPScatter 
// data={parsedData} 
regionData={regionData} 
year={year}  scrWidth={scrWidth} />
:
<div />
            } */}

        </div>
    )
}
