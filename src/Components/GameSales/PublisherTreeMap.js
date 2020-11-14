import React, {useState} from 'react'
import Chart from 'react-apexcharts'

function PublisherTreeMap(props) {
  const data = props.data
  console.log(props)
  const options = {
    legend: {
      show: false
    },
    chart: {
      height: 350,
      type: 'treemap'
    },
  }
  const mappedTitles = data.map((d) => {
    let f = d[Object.keys(d)[0]]
    return {
      x: Object.keys(d)[0],
      y: f.title
    }
  })
  const mappedSales = data.map((d) => {
    let f = d[Object.keys(d)[0]]
    return {
      x: Object.keys(d)[0],
      y: f.unitTotal
    }
  })
  return (
    <div>

      {mappedTitles.length > 0 ?
      <div>

      <Chart series={props.toggle
        ?
        [{ data: mappedTitles }]
        :
        [{ data: mappedSales }]
      } options={options} type="treemap" />
      </div>
      : 
      <div><p>Preparing chart</p></div> 
      }

    </div>
  )
}

export default PublisherTreeMap