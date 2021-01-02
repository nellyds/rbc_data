import React, { useContext, useState, useEffect } from 'react'
import { CFPContext } from "../Contexts/CFPContext"
import CFPCopy from "../Components/CFP/CFPCopy"
import Slider from '@material-ui/core/Slider';
import { CFPcopy } from "../Util/Constants"
import CFPScatter from "../Components/CFP/CFPScatter"
import Carousel from "../Components/Forms/Carousel"
export default function CFP() {

    const { compile, cfpData, gdpData, years, parsedData, popData, regionData } = useContext(CFPContext)
    const [year, setYear] = useState(2005)
    const [loading, setLoading] = useState(true)
    const [scrWidth, setScrWidth] = useState(500)
    const [fetching, setFetching] = useState(null)
    const [copyIndex, setCopyIndex] = useState(-1)
    const [selectIndex, setIndex] = useState(0)
    function handleResize() {
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    )
    const compileChart = async () => {
        setFetching(true)
        await compile(cfpData, gdpData, popData, years)
        setLoading(false)
    }
    const handleYear = (event, newValue) => {
        setYear(newValue)
    }

    const handleCopyIndex = (update) => {
        setCopyIndex(copyIndex + update)
        if (copyIndex === 3) {
            setIndex(5)
        }
        if (copyIndex === 4) {
            setIndex(6)
        }
        if (copyIndex > 5) {
            setIndex(0)
        }

    }
    //copy index updates with prop
    //select index updates only on certain copy index updates

    return (
        <div style={{ width: scrWidth }}>
            <Slider
                defaultValue={2000}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChange={handleYear}
                step={1}
                marks={true}
                min={2000}
                max={2015}
            />
            {loading === true ? <p onClick={compileChart}>Build Chart</p> :
                <div>
                    <Carousel handleCopyIndex={handleCopyIndex}
                        copyIndex={copyIndex}
                    >
                        {CFPcopy.map((d) => <p >{d}</p>
                        )}
                    </Carousel>
                    <CFPScatter
                        setIndex={setIndex}
                        selectIndex={selectIndex}
                        copyIndex={copyIndex}
                        regionData={regionData}
                        year={year} scrWidth={scrWidth} />

                </div>
            }
            {loading === true && fetching === true
                ?
                <p>Loading...</p>
                :
                null
            }
        </div>
    )
}
