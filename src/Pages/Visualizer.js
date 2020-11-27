import React, { useContext, useState } from 'react'
import { VisualizerContext } from "../Contexts/VisualizerContext"
import { PageHeader, Paragraph } from "../Styles/StyledComponents"
import FieldSelect from "../Components/Forms/FieldSelect"
import CSVUpload from "../Components/Forms/CSVUpload"
import Chart from "../Components/Visualizer/Chart"
import Button from '@material-ui/core/Button';
import { CompactPicker } from 'react-color';
export default function Visualizer() {

    const { dataKeys, setData, data, compileForChart, chartData } = useContext(VisualizerContext)
    const [selectedDataKey, setSelectedDataKey] = useState('')
    const [rgbColor, selectColor] = useState('')
    const [errors, setErrors] = useState([])

    const handleChartSelect = () => {
        if (rgbColor.length > 2) {
            compileForChart(selectedDataKey, rgbColor)
            selectColor('')
        } else {

            let errorArr = errors
            errorArr.push('Select a color and a data field')
            setErrors(errorArr)
        }
    }

    const clearErrors = () => {
        setErrors([])
    }


    const dataKeyFields = dataKeys.filter((d) => d.sorts.length > 0).map((d) => d.name)
    const handleChange = color => {
        selectColor(color.hex)
    }
    return (
        <div>
            <PageHeader id="2" >Visualizer</PageHeader> 
            <Paragraph>First attempt at making a data visualizer.  It works fine with certain kinds of data sets, but it too format dependent and I am too lazy.  </Paragraph>
            <p>Upload a dataset in csv format</p>
            <CSVUpload setData={setData} />
            <p>{selectedDataKey}</p>
            <p>{rgbColor}</p>
            <p>Select a datakey to build your chart</p>
            <Button id={selectedDataKey} onClick={handleChartSelect} variant="outlined" color="black">Generate Chart</Button>
            {data.length > 0 ?? dataKeys.length > 0
                ?
                <div>
                    {/* {dataKeys.map((d) => <DataKey name={d.name} sorts={d.sorts} type={d.type} setKey={setSelectedDataKey} />)} */}
                    <FieldSelect setField={setSelectedDataKey} fields={dataKeyFields} />
                    <CompactPicker onChange={handleChange} />
                </div>
                :
                <p>Data not ready</p>}

            {chartData.length > 0 ?
                <Chart data={chartData} />
                :
                <p>Chart not ready</p>
            }
            {errors.map((d) => <p onClick={clearErrors}>{d} </p>)}
        </div>
    )
}
