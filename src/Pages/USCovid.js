import React, {useState} from 'react'
import FieldSelect from "../Components/Forms/FieldSelect"
import {covidFields} from "../Util/Constants"
function USCovid(){
    const [dailyField, setDailyField] = useState('death')
    return(
        <div>
        <FieldSelect fields={covidFields}  dailyField={dailyField} setDailyField={setDailyField} />
        <p>{dailyField}</p>
        </div>
    )
}

export default USCovid