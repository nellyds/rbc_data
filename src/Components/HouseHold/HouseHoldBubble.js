
import React, { useState , useEffect} from 'react'
import { XYPlot, XAxis, YAxis, MarkSeries, LineMarkSeries, LineSeries, Hint } from 'react-vis'
import {ChartHolder, VariableChartBox} from "../../Styles/StyledComponents"

import BarChartIcon from '@material-ui/icons/BarChart';
import Tooltip from '@material-ui/core/Tooltip';
export default function HouseHoldBubble(props) {


    const [sortedData, setSorted] = useState([])
    const [hoverIndex, setIndex] = useState(0)
    const [scrWidth, setScrWidth] = useState(500)
    const [allMarks, setMarks] = useState([])
    const [value, setValue] = useState(null)
    function handleResize() {
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setScrWidth(window.innerWidth < 600  ? Math.floor(window.innerWidth * .8) : 800)
    }
    )

    const data = props.data
    const sort = async () => {
        let d = data.map((d, i) => d.data.map((f) => {
            return {
                x: f.year,
                y: f.share,
                name: f.name,
            }
        }))
        setSorted([...d])
        let flatten = data.map((d) => d.data)
        let e = await [].concat.apply([], flatten).map((d, i) => {
            return [{
                x: d.year,
                y: d.share,
                size: d.gdp,
                name: d.name,
                index: i,
            }]
        }
        )
        setMarks([...e])
    }
    return (
        <div>
            <Tooltip title="build graph">
            <BarChartIcon onClick={sort} />
            </Tooltip>
            {sortedData.length > 0
                ?
                <div>
<VariableChartBox>
                    <XYPlot yDomain={[-1, 50]}
                        xDomain={[1970, 2030]} width={scrWidth} height={500}>
                        <XAxis  
                        tickFormat={Number}
                    tickLabelAngle={90}   
                    title="Year"                     
                        />
                        <YAxis title="Percentage households headed by unmarried"/>
                        {allMarks.map((d, i) =>
                            <MarkSeries
                                sizeRange={i === hoverIndex ? [30, 40] : [1, 30]}
                                key={i}
                                onValueMouseOver={(data) => setIndex(data.index)}
                                onValueMouseOut={() => setIndex(null)}
                                onNearestXY={(data) => setValue(data)}
                                onSeriesMouseOut={() =>setValue(null)}
                                data={d}
                                opacity={i === hoverIndex ? 1 : .1}
                            />)
                        }
                        {sortedData.map((d, i) =>
                                <LineMarkSeries key={i} id={i}

                                    animation
                                    data={d}
                                />
                            )
                        }
{value ? <Hint value={value} /> : null}
                    </XYPlot>
                    </VariableChartBox>
                </div>

                : <p></p>


            }

        </div>
    )
}
