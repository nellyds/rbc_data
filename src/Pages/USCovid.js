import React, { useContext, useState } from 'react'
import { CovidContext } from "../Contexts/CovidContext"
import { StatGrid, CenterDiv } from "../Styles/StyledComponents"
import { getAverage, getField } from "../Util/DataParseMethods"
import FieldSelect from "../Components/Forms/FieldSelect"
import Button from '@material-ui/core/Button';
import { PageHeader , Paragraph} from "../Styles/StyledComponents"
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import TrendChart from "../Components/Covid/TrendChart"
import {covidFields} from "../Util/Constants"
function USCovid(){

const { current, pastWeek, pastMonth } = useContext(CovidContext)
const [dailyField, setDailyField] = useState('death')
const [dataSet, setDataSet] = useState([])
const [dataRange, setDataRange] = useState('weekly')
const range = ['weekly', 'monthly']
const buildChart = async () => {
    if (dailyField !== '') {
        if (dataRange === 'weekly') {
            let result = await getField(pastWeek, dailyField)
            setDataSet(result[dailyField].reverse())
        } else {
            let result = await getField(pastMonth, dailyField)
            setDataSet(result[dailyField].reverse())
        }
    }
}
return (
    <div>
                    <PageHeader >US Covid data</PageHeader>
                    <Paragraph>First foray into data vis in both React and using React vis.  Depressing, no?</Paragraph>
        {current != null && pastWeek != null
            ?
            <CenterDiv>
                <FormControl>
                    <Select 
                        value={dataRange}
                        onChange={(event) => {
                            setDataRange(event.target.value)
                        }}
                    >
                        <FormHelperText>Choose a field of data</FormHelperText>
                        {range.map(value => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>
                    <FormHelperText>Choose a time range for data</FormHelperText>
                </FormControl>
                <FieldSelect fields={covidFields} dailyField={dailyField} setField={setDailyField} />
                {dataSet.length > 0 ?
                    <TrendChart data={dataSet} /> :
                    <div>
                    <p>Select a data set!</p>
                    <p>Select a time frame!</p>
                    </div>
                }

                <Button onClick={buildChart} variant="outlined" color="primary">
                    Build Chart
            </Button>
            </CenterDiv>
            :
            <div>
                <p>Data not loaded</p>
            </div>
        }
    </div>
)
}

export default USCovid