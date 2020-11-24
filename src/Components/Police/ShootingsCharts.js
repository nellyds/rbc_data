import React, { useState, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import { colors } from "../../Util/Constants"
import { DataPoint, ChartHolder } from "../../Styles/StyledComponents"
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Hint, Crosshair, VerticalBarSeries, DiscreteColorLegend } from 'react-vis';
const TrendChart = (props) => {
    const data = props.data
    const years = props.years
    const [dataPoint, setDataPoint] = useState({ date: '', value: '' })
    const [scrWidth, setScrWidth] = useState(500)
    const [showRace, toggleRace] = useState(false)
    const [crossHairValue, setCrossHair] = useState([])
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
            y: d.total,
            z: 'total'
        }
    })
    const wArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.White,
            z: 'White'
        }
    })
    const bArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.Black,
            z: 'Black'
        }
    })

    const hArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.Hispanic,
            z: 'Hispanic'
        }
    })
    const aArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.Asian,
            z: 'Asian'
        }
    })

    const oArr = data.map((d) => {
        return {
            x: d.date,
            y: d.race.Other,
            z: 'Other'
        }
    })
    
    return (

        <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeInRight" >

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
                        onValueClick={(value) => setDataPoint(value)}
                        cluster="a"
                        animation
                        data={wArr}
                        color={colors['W']}
                        opacity='.6'
                    />
                                        <VerticalBarSeries id={props.name}
                        onValueClick={(value) => setDataPoint(value)}
                        animation
                        cluster="a"
                        data={hArr}
                        color= {colors['H']}
                        opacity='1'
                    />
                    <VerticalBarSeries id={props.name}
                        onValueClick={(value) => setDataPoint(value)}
                        animation
                        cluster="a"
                        data={bArr}
                        color={colors['B']}
                        opacity="1"
                    />

                    <VerticalBarSeries id={props.name}
                        onValueClick={(value) => setDataPoint(value)}
                        animation
                        cluster="a"
                        data={aArr}
                        color={colors['A']}
                        opacity='1'
                    />
                    <VerticalBarSeries id={props.name}
                       onValueClick={(value) => setDataPoint(value)}

                        animation
                        cluster="a"
                        data={oArr}
                        color={colors['O']}
                        opacity='1'
                    />
            <Crosshair values= {crossHairValue} />
                </XYPlot>
            </ChartHolder>
            <DataPoint>
                <p>
                    {dataPoint.x} :  {dataPoint.y} : {dataPoint.z}

                </p>
            </DataPoint>
        </ScrollAnimation>
    );
}

export default TrendChart;