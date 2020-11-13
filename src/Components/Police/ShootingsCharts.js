import React, { useState, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import { DataPoint, ChartHolder } from "../../Styles/StyledComponents"
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Hint, VerticalBarSeries, DiscreteColorLegend } from 'react-vis';
const TrendChart = (props) => {
    const data = props.data
    const years = props.years
    const [dataPoint, setDataPoint] = useState({ date: '', value: '' })
    const [scrWidth, setScrWidth] = useState(500)
    const [showRace, toggleRace] = useState(false)
    function handleResize() {
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setScrWidth(Math.floor(window.innerWidth * .8))
    }
    )

    const dataArr = data.map((d) => {
        return {
            x: d.date,
            y: d.total
        }
    })
    const wArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.w
        }
    })
    const bArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.b
        }
    })

    const hArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.h
        }
    })
    const aArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.a
        }
    })

    const oArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.o
        }
    })
    return (

        <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeInRight" >
            <DataPoint>
                <p>
                    {dataPoint.x} :  {dataPoint.y}

                </p>
            </DataPoint>
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
                            {
                                title: 'Total',
                                color: 'Green'
                            }
                        ]}
                    />
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <XAxis title="Date" style={{
                        line: { stroke: '#ADDDE1' },

                    }} />
                    <YAxis title={props.name}
                        style={{
                            line: { stroke: '#ADDDE1' },
                            ticks: { stroke: '#ADDDE1' }
                        }}
                    />
           <VerticalBarSeries id={props.name}
                        onNearestXY={(value) => setDataPoint(value)}
                        cluster="b"
                        animation
                        data={dataArr}
                        color="green"
                        opacity='.5'
                    />
 

                </XYPlot>
            </ChartHolder>
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
                            {
                                title: 'Total',
                                color: 'Green'
                            }
                        ]}
                    />
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <XAxis title="Date" style={{
                        line: { stroke: '#ADDDE1' },

                    }} />
                    <YAxis title={props.name}
                        style={{
                            line: { stroke: '#ADDDE1' },
                            ticks: { stroke: '#ADDDE1' }
                        }}
                    />
                    <VerticalBarSeries id={props.name}
                        onNearestXY={(value) => setDataPoint(value)}
                        cluster="a"
                        animation
                        data={wArr}
                        color="blue"
                        opacity='1'
                    ></VerticalBarSeries>
                    <VerticalBarSeries id={props.name}
                        onNearestXY={(value) => setDataPoint(value)}
                        cluster="a"
                        animation
                        data={wArr}
                        color="blue"
                        opacity='1'
                    />
                    <VerticalBarSeries id={props.name}
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        cluster="a"
                        data={bArr}
                        color="red"
                        opacity="1"
                    />
                    <VerticalBarSeries id={props.name}
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        cluster="a"
                        data={hArr}
                        color="orange"
                        opacity='1'
                    />
                    <VerticalBarSeries id={props.name}
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        cluster="a"
                        data={aArr}
                        color="purple"
                        opacity='1'
                    />
                    <VerticalBarSeries id={props.name}
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        cluster="a"
                        data={oArr}
                        color="violet"
                        opacity='1'
                    />

                </XYPlot>
            </ChartHolder>
        </ScrollAnimation>
    );
}

export default TrendChart;