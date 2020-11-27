import React, { useState, useContext } from 'react'
import { DataContext } from "../Contexts/DataContext"
import { PageHeader, Paragraph} from "../Styles/StyledComponents"
import ShootingsCharts from "../Components/Police/ShootingsCharts"
import RaceChart from "../Components/Police/RaceChart"
import FieldSelect from "../Components/Forms/FieldSelect"
function PoliceShootings() {
    const { shootingDataReady, monthlyData, yearRange, raceData } = useContext(DataContext)
    const [data, setData] = useState([])
    const [year, setYear] = useState('2017')
    const yearFilter = async () =>{
        await setData(monthlyData.filter((d) =>parseInt(d.year) === parseInt(year)))
    }

    return (
        <div>
            <PageHeader >Police Shootings</PageHeader> 
            <Paragraph>For my second time working with React-vis, I started working with CSV files.  I have to say, it makes the need for a relational database much more apparent, little as I like SQL.
            Sorting the values by month and race was the sort of thing that would be a bit easier in Python, but the collection methods of ES6 are pretty intuitive to use.  Stacking graphcs made for a neat effect.  

            </Paragraph>
            <FieldSelect fields={yearRange}  dailyField={year} setField={setYear} />
            <p>{year}</p>
            {shootingDataReady && monthlyData.length > 0 ?
<div>
                <ShootingsCharts data={data} year={year} years={yearRange} />
                <p onClick={yearFilter}>build chart</p>
                <RaceChart data={raceData} />
                </div>
                :
                <p>Data not ready</p>
                
            }
        </div>
    )
}

export default PoliceShootings