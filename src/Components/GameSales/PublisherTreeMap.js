import React from 'react'
import Chart from 'react-apexcharts'

function PublisherTreeMap(props){
    const data = props.data
    console.log(props.data)
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
    let f = d[Object.keys(d)[0]]
    console.log(f.unitTotal)
    return{
        x: Object.keys(d)[0],
        y: f.title
    }
})
console.log(mappedData)
    return(
        <div>
<Chart series={[{data: mappedData}]} options={options} type="treemap" />
        </div>
    )
}

export default PublisherTreeMap