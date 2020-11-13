import React, { useState, useContext } from 'react'
import { DataContext } from "../Contexts/DataContext"
import { PageHeader } from "../Styles/StyledComponents"
import ShootingsCharts from "../Components/Police/ShootingsCharts"
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
            <FieldSelect fields={yearRange}  dailyField={year} setDailyField={setYear} />
            <p>{year}</p>
            {shootingDataReady && monthlyData.length > 0 ?
<div>
                <ShootingsCharts data={data} year={year} years={yearRange} />
                <p onClick={yearFilter}>build chart</p>
                </div>
                :
                <p>Data not ready</p>
            }
        </div>
    )
}

export default PoliceShootings