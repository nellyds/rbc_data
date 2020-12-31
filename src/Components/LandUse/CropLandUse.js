import React from 'react'

import {graphColors} from "../../Util/Constants"
import Chart from 'react-apexcharts'
export default function CropLandUse(props) {
    const data = props.data
    const options = {
        legend: {
          show: false
        },
        chart: {
          height: 350,
          type: 'treemap'
        },
      }
    const mapped = props.data.filter((d) => parseInt(props.year) === parseInt(d.year))[0].data.map((d,i) =>{return{
        y: Math.floor(parseFloat(d[2]) * .00001),
        x: d[0],
        color: graphColors[i]
    }})



    return (
        <div>
            <p>{props.year} </p>
      <Chart 
        series ={[{data: mapped }]}
       options={options} type="treemap" />
        </div>
    )
}
