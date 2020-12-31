import React, { useState, useEffect } from 'react'
import { ChartHolder } from "../../Styles/StyledComponents"
import BarChartIcon from '@material-ui/icons/BarChart';
import { XYPlot, XAxis, YAxis, LineMarkSeries, DiscreteColorLegend, Hint } from 'react-vis'
import { NaturePeopleOutlined } from '@material-ui/icons';
export default function HomicideChart({ gdp = [], homicide = []}) {
    const [selectedIndex, setIndex] = useState(null)
    const [hValue, setHValue] = useState(null)
    const [gValue, setGValue] = useState(null)
    const [ready, setReady] = useState(null)
    const fields = gdp.map((d) => {
        return {
            title: d.name,
            color: d.color
        }
    })
    return (
        <div>
            <BarChartIcon onClick={()=>setReady(true)} />
            {ready ?
                        <ChartHolder>
                                <DiscreteColorLegend items={fields} />
                                <XYPlot
                                    xDomain={[1990, 2020]}
                                    width={350} height={300}>
                                    <XAxis
                                        tickFormat={Number}
                                        tickLabelAngle={90}
                                        title="Year"
                                    />
                                    <YAxis title="Homicides per 100k" />
                                    {homicide.map((d, i) =>
        
                                        <LineMarkSeries data={d.homicideData}
                                            onValueMouseOver={(data) => setHValue(data)}
                                            size={2}
                                            onValueMouseOut={() => setHValue(null)}
                                            onSeriesMouseOver={() => setIndex(i)}
                                            onSeriesMouseOut={() => setIndex(null)}
                                            size={i === selectedIndex ? 5 : 2}
                                            opacity={i !== selectedIndex ? .3 : 1}
                                            key={i} color={d.color} />
                                    )}
        
                                </XYPlot>
                                <XYPlot
                                    xDomain={[1990, 2020]}
                                    width={350} height={300}>
                                    <XAxis
                                        tickFormat={Number}
                                        tickLabelAngle={90}
                                        title="Year"
                                    />
                                    <YAxis title="G.D.P." />
                                    {gdp.map((d, i) =>
                                        <LineMarkSeries data={d.gdpData}
                                            onValueMouseOver={(data) => setGValue(data)}
                                            size={i === selectedIndex ? 5 : 2}
                                            onSeriesMouseOver={() => setIndex(i)}
                                            onValueMouseOut={() => setGValue(null)}
                                            onSeriesMouseOut={() => setIndex(null)}
                                            opacity={i !== selectedIndex ? .3 : 1}
                                            key={i} color={d.color} />
                                    )}
                                    {gValue ? <Hint value={gValue} /> : null}
                                    {hValue ? <Hint value={hValue} /> : null}
                                </XYPlot>    
                    </ChartHolder>
                    :
                    <p />
            }
        </div>
    )
}

