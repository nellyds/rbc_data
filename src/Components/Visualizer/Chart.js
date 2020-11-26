import React, { useState, useEffect } from 'react'
import { DataPoint, ChartHolder } from "../../Styles/StyledComponents"
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, Hint, DiscreteColorLegend, LineMarkSeries } from 'react-vis';

export default function Chart(props) {
    const chartData = props.data
    const [dataPoint, setDataPoint] = useState({ date: '', value: '' })
    const [scrWidth, setScrWidth] = useState(500)
    const [hoveredCell, setHoverState] = useState(false)
    function handleResize() {
        setScrWidth(Math.floor(window.innerWidth * .8))

    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setScrWidth(Math.floor(window.innerWidth * .8))

    }
    )

    const chartLegends = chartData.map((d) => {
        return {
            title: d.field,
            color: d.color
        }
    })
    return (
        <div>
            <ChartHolder>

                <XYPlot
                    xType="ordinal"
                    width={scrWidth}
                    height={500}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis style={{
                        line: { stroke: '#ADDDE1' },

                    }} />
                    <YAxis title={props.name}
                        style={{
                            line: { stroke: '#ADDDE1' },

                        }}
                    />
                    <DiscreteColorLegend
                        style={{ position: 'absolute', right: '50px', top: '10px', backgroundcolor: 'White' }}
                        orientation="horizontal"
                        items={chartLegends}
                    />
                    {chartData.map((d) =>
                        <VerticalBarSeries id={d.field}
                            cluster={d.field}
                            onNearestXY={(value) => setDataPoint(value)}
                            animation
                            data={d.data}
                            color={d.color}
                            opacity='.5'
                            onSeriesMouseOver={(data) => {
                                setHoverState(data.event[0])
                            }
                            }
                            onSeriesMouseOut={() => setHoverState(false)}
                        />
                    )
                    }
                    {hoveredCell && (
                        <Hint value={{ x: 0, y: 0 }}>
                            <div >{hoveredCell.name}</div>
                        </Hint>
                    )}
                </XYPlot>
            </ChartHolder>
            <DataPoint>

                <p>
                    {dataPoint.x} :  {dataPoint.y}

                </p>
            </DataPoint>
        </div>
    )
}