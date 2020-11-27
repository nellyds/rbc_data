
import React, { useState } from 'react'
import { XYPlot, XAxis, YAxis, MarkSeries, LineMarkSeries, LineSeries } from 'react-vis'
export default function HouseHoldBubble(props) {


    const [sortedData, setSorted] = useState([])
    const [hoverIndex, setIndex] = useState(0)
    const [allMarks, setMarks] = useState([])
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
            <p onClick={sort}>Sort</p>
            {sortedData.length > 0
                ?
                <div>

                    <XYPlot yDomain={[-1, 50]}
                        xDomain={[1970, 2030]} width={500} height={500}>
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
                                data={d}
                                opacity={i === hoverIndex ? 1 : .1}
                            />)
                        }
                        {
                            sortedData.map((d, i) =>
                                <LineMarkSeries key={i} id={i}
                                    animation
                                    data={d}
                                />
                            )
                        }

                    </XYPlot>

                </div>

                : <p></p>


            }

        </div>
    )
}
