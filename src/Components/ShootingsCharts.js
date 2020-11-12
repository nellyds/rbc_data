import React, { useState, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import { DataPoint, ChartHolder } from "../Styles/StyledComponents"
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries } from 'react-vis';
const TrendChart = (props) => {
    const data = props.data
    const years = props.years
    const [dataPoint, setDataPoint] = useState({ date: '', value: '' })
    const [scrWidth, setScrWidth] = useState(500)
    console.log(years)
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
    const totalData = data.map((d)=>{
        return{
            x: d.date,
            y: d.total
        }
    })

    });
    return (

        <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeInRight" >
            <ChartHolder>
                <XYPlot
                    xType="ordinal"
                    width={scrWidth}
                    height={500}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Date" style={{
                        line: { stroke: '#ADDDE1' },

                    }} />
                    <YAxis title={props.name}
                        style={{
                            line: { stroke: '#ADDDE1' },
                            ticks: { stroke: '#ADDDE1' }
                        }}
                    />
                    <LineMarkSeries id={props.name}
                        onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={dataArr}
                        color="green"
                        opacity='.5'
                    />
                </XYPlot>
            </ChartHolder>
            <DataPoint>
                <p>
                    {dataPoint.x} :  {dataPoint.y}

                </p>
            </DataPoint>
        </ScrollAnimation>
    );
}

export default TrendChart;