import React, { useState, useEffect } from 'react'
import { ChartHolder } from "../../Styles/StyledComponents"
import { XYPlot, XAxis, YAxis, LineMarkSeries, DiscreteColorLegend, Crosshair, Hint } from 'react-vis'

export default function HomicideChart({ gdp = [], homicide = [] }) {

    const [value, setValue] = useState(null)
    const [selectedIndex, setIndex] = useState(null)
    const [scrWidth, setScrWidth] = useState(500)
    const [hValue, setHValue] = useState(null)
    const [gValue, setGValue] = useState(null)
    const fields = gdp.map((d) => {
        return {
            title: d.name,
            color: d.color
        }
    })
    function handleResize() {
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setScrWidth(window.innerWidth < 600  ? Math.floor(window.innerWidth * .8) : 800)
    }
    )
    return (
        <div>

            <div >
                {homicide.length > 0 ?
                    <ChartHolder>
                        <DiscreteColorLegend items={fields} />
                        <XYPlot
                            yDomain={[-1, 50]}
                            xDomain={[1990, 2020]}
                            width={scrWidth} height={300}>
                            <XAxis
                                tickFormat={Number}
                                tickLabelAngle={90}
                                title="Year"
                            />
                            <YAxis title="Homicides per 100k" />
                            {homicide.map((d, i) =>
                                <LineMarkSeries data={d.homicideData}
                                    onValueMouseOver={(data) => setHValue(data)}
        
                                    onValueMouseOut={() =>setHValue(null)}
                                    onSeriesMouseOver={() => setIndex(i)}
                                    onSeriesMouseOut={() => setIndex(null)}

                                    opacity={i !== selectedIndex ? .3 : 1}
                                    key={i} color={d.color} />
                            )}

                        </XYPlot>
                        <XYPlot
                            yDomain={[-1, 50]}
                            xDomain={[1990, 2020]}
                            width={scrWidth} height={300}>
                            <XAxis
                                tickFormat={Number}
                                tickLabelAngle={90}
                                title="Year"
                            />
                            <YAxis title="G.D.P."/>
                            {gdp.map((d, i) =>
                                <LineMarkSeries data={d.gdpData}
                                     onValueMouseOver={(data) => setGValue(data)}

                                    onSeriesMouseOver={() => setIndex(i)}
                                    onValueMouseOut={() =>setGValue(null)}
                                    onSeriesMouseOut={() => setIndex(null)}
                                    opacity={i !== selectedIndex ? .3 : 1}
                                    key={i} color={d.color} />
                            )}
                            {gValue ? <Hint value={gValue} /> : null}
                            {hValue ? <Hint value={hValue} /> : null}
                        </XYPlot>
                    </ChartHolder>
                    : <p></p>
                }
            </div>
        </div>
    )
}
