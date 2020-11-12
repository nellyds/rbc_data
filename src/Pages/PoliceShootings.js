import React, { useState, useContext } from 'react'
import { DataContext } from "../Contexts/DataContext"
import { PageHeader } from "../Styles/StyledComponents"
import ShootingsCharts from "../Components/ShootingsCharts"
function PoliceShootings() {
    const { shootingDataReady, monthlyData, yearRange, raceData } = useContext(DataContext)
    const [data, setData] = useState([])
    return (
        <div>
            <PageHeader >Police Shootings</PageHeader>
            {shootingDataReady && monthlyData.length > 0 ?
                <ShootingsCharts data={monthlyData} years={yearRange} />
                :
                <p>Data not ready</p>
            }
        </div>
    )
}

export default PoliceShootings