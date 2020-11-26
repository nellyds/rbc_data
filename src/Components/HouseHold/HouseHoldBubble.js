
import React, { useState } from 'react'
import { XYPlot, XAxis, YAxis, MarkSeries, LineSeries } from 'react-vis'
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
                size:  i === hoverIndex ? d.gdp : .1,
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
                    <p>{hoverIndex}</p>
                    <XYPlot yDomain={[-1, 50]}
                        onMouseLeave={() => setIndex(null)}
                        xDomain={[1970, 2030]} width={500} height={500}>
                        <XAxis />
                        <YAxis />
                        {allMarks.map((d,i) =><MarkSeries 
                        key={i}
                        onSeriesClick={(data) =>setIndex(data.index)}
                        data={d} />)
                        }
                        {
                            sortedData.map((d, i) =>
                                <LineSeries key={i} id={i}
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
