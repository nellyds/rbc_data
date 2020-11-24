import React, { useEffect, useState } from 'react'
import { DataPoint, ChartHolder } from "../../Styles/StyledComponents"
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, DiscreteColorLegend, LineMarkSeries } from 'react-vis';
import { races, colors } from "../../Util/Constants"
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
                                color: colors['W']
                            },
                            {
                                title: 'Hispanics',
                                color: colors['H']
                            },
                            {
                                title: 'Black',
                                color: colors['B']
                            },
                            {
                                title: 'Asian',
                                color: colors['A']
                            },
                            {
                                title: 'Other',
                                color: colors['O']
                            },
                        ]}
                    />
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries id={props.name}
                        cluster='w'
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mappedData[1]['W']}
                        color={colors['W']}
                        opacity='1'
                    />



                    <VerticalBarSeries id={props.name}
                        cluster='h'
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mappedData[2]['H']}
                        color={colors['H']}
                        opacity='1'
                    />
                                        <VerticalBarSeries id={props.name}
                        cluster='b'
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mappedData[3]['B']}
                        color={colors['B']}
                        opacity='1'
                    />
                                        <VerticalBarSeries id={props.name}
                        cluster='a'
                        animation
                        data={mappedData[0]['A']}
                        color={colors['A']}
                        opacity='1'
                    />
                    <VerticalBarSeries id={props.name}
                        cluster='o'
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mappedData[4]['O']}
                        color={colors['O']}
                        opacity='1'
                    />
                </XYPlot>

            </ChartHolder>
        </div>
    )
}

export default RaceChart;