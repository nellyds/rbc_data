import React from 'react'
import { ChartHolder } from "../../Styles/StyledComponents"
import BarChartIcon from '@material-ui/icons/BarChart';
import {graphColors} from "../../Util/Constants"
import { XYPlot, XAxis, YAxis,  VerticalGridLines, HorizontalGridLines, VerticalBarSeries, DiscreteColorLegend, Hint } from 'react-vis'


export default function CropBar(props) {
    const data =props.data
    const mapped = props.data.filter((d) => parseInt(props.year) === parseInt(d.year))[0].data.map((d,i) =>{return{
        y: Math.floor(parseFloat(d[2]) * .00001),
        x: d[0],
        color: graphColors[i]

    }})
    const fields = mapped.map((d,i) => {return{title: d.x, color: graphColors[i]}})
    return (
        <div>
                                    <ChartHolder>
                                    <XYPlot
                   
                   xType="ordinal"

                   width={500}
                   height={500}
               >
                   <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <DiscreteColorLegend 
                                            style={{ position: 'absolute', right: '50px', top: '10px', backgroundcolor: 'White' }}
                                            orientation="horizontal" 
                                            items = {fields} />
                    <VerticalBarSeries 
                        // cluster='h'
                        // onNearestXY={(value) => setDataPoint(value)}
                        animation
                        data={mapped}
                        colorType="literal"
                        opacity='1'
                    />
                    </XYPlot>
                                </ChartHolder>
        </div>
    )
}
