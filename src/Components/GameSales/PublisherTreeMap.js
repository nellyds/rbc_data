import React from 'react'
import Chart from 'react-apexcharts'

function PublisherTreeMap(props){
    const data = props.data
    const options =  {
        legend: {
          show: false
        },
        chart: {
          height: 350,
          type: 'treemap'
        },
        title: {
          text: 'Top Game Publishers'
        }
      }
    const mappedData = data.map((d) =>{
        return{
            x: Object.keys(d)[0],
            y: d[Object.keys(d)[0]]
        }
    })
    return(
        <div>
<Chart series={[{data: mappedData}]} options={options} type="treemap" />
        </div>
    )
}

export default PublisherTreeMap