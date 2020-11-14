import React from 'react'
import Chart from 'react-apexcharts'

function TitlesChart(props) {
    const data = props.data
    const mappedData = data.map((d) => d.globalTotal)
    const labels = data.map((d) => d.title)

    const options =  {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: labels,
        }
      }
    return (
        <div>
            {
                mappedData.length > 0 ?
                    <Chart options= {options} series={[{ data: mappedData }]} type="bar" height={350} />
                    : <div>
                        <p>Preparing chart</p>
                    </div>
            }

        </div>
    )
}

export default TitlesChart