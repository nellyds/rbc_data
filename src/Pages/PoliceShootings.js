import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from "../Contexts/DataContext"
import { PageHeader } from "../Styles/StyledComponents"
function PoliceShootings() {
    const { dataReady, monthlyData} = useContext(DataContext)
    const [data, setData] = useState([])
    return (
        <div>
            <PageHeader >Police Shootings</PageHeader>
            {dataReady && monthlyData.length > 0 ?
            monthlyData.map((item) =>
            <p key={item.date}> {item.total} </p>)
            :
<p>Data not ready</p>
            }
        </div>
    )
}

export default PoliceShootings