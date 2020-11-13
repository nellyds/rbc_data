import React, { useEffect, useState } from 'react'
import { DataPoint, ChartHolder } from "../../Styles/StyledComponents"
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, DiscreteColorLegend, LineMarkSeries } from 'react-vis';
import { races } from "../../Util/Constants"
function RaceChart(props) {
    const [dataPoint, setDataPoint] = useState({ date: '', value: '' })
    const [scrWidth, setScrWidth] = useState(500)
    function handleResize() {
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    )
    const data = props.data
    const fields = Object.keys(data.A)

    const parseRaceData = (race) => {
        return fields.map((d) => {
            return {
                x: d,
                y: data[race][d]
            }
        })
    }

    const mappedData = []
    for (let i = 0; i < races.length; i++) {
        let v = races[i]
        let obj = {}
        obj[v] = parseRaceData(v)
        mappedData.push(obj)
    }
    return (
        <div>
            <ChartHolder>
                <XYPlot
                    className="clustered-stacked-bar-chart-example"
                    xType="ordinal"

                    width={scrWidth}
                    height={500}
                >
                    <DiscreteColorLegend
                        style={{ position: 'absolute', right: '50px', top: '10px', backgroundcolor: 'White' }}
                        orientation="horizontal"
                        items={[
                            {
                                title: 'White',
                                color: 'Blue'
                            },
                            {
                                title: 'Hispanics',
                                color: 'Orange'
                            },
                            {
                                title: 'Black',
                                color: 'Red'
                            },
                            {
                                title: 'Asian',
                                color: 'Purple'
                            },
                            {
                                title: 'Other',
                                color: 'Violet'
                            },
                        ]}
                    />
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries id={props.name}
                        cluster='a'
                        animation
                        data={mappedData[0]['A']}
                        color="purple"
                        opacity='.5'
                    />
                    <VerticalBarSeries id={props.name}
                        cluster='o'
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mappedData[4]['O']}
                        color="violet"
                        opacity='.5'
                    />
                    <VerticalBarSeries id={props.name}
                        cluster='w'
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mappedData[1]['W']}
                        color="blue"
                        opacity='.5'
                    />
                    <VerticalBarSeries id={props.name}
                        cluster='b'
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mappedData[3]['B']}
                        color="red"
                        opacity='.5'
                    />
                    <VerticalBarSeries id={props.name}
                        cluster='h'
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mappedData[2]['H']}
                        color="orange"
                        opacity='.5'
                    />
                </XYPlot>

            </ChartHolder>
        </div>
    )
}

export default RaceChart;