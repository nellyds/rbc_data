import React, { useEffect } from 'react'
import { graphColors } from "../../Util/Constants"
import { XYPlot, XAxis, YAxis,LineMarkSeries, LineSeries, MarkSeries, Hint } from 'react-vis'
//write map function for each gdp projection and homicides

export default function HomicideChart({ gdp = [], homicide = [] }) {

    return (
        <div>
            <div>
                <XYPlot width={300}
                    yDomain={[-1, 50]}
                    xDomain={[1990, 2020]}
                    height={150}>
                    <XAxis
                        tickFormat={Number}
                        tickLabelAngle={90}
                        title="Year"
                    />
                    <YAxis />
                    {gdp.map((d, i) =>
                        <LineSeries data={d.gdpData} key={i} />
                    )}
    
                </XYPlot>
                <XYPlot
                    yDomain={[-1, 50]}
                    xDomain={[1990, 2020]}
                    width={300} height={150}>
                    {homicide.map((d, i) =>
                        <LineSeries data={d.homicideData} key={i} />
                    )}
                    <XAxis
                        tickFormat={Number}
                        tickLabelAngle={90}
                        title="Year"
                    />
                    <YAxis />
                </XYPlot>
            </div>
        </div>
    )
}
