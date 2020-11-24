import React, { useContext, useState } from 'react'
import { VisualizerContext } from "../Contexts/VisualizerContext"
import { PageHeader } from "../Styles/StyledComponents"
import FieldSelect from "../Components/Forms/FieldSelect"
import CSVUpload from "../Components/Forms/CSVUpload"
import Chart from "../Components/Visualizer/Chart"
import DataKey from "../Components/Visualizer/DataKey"
import { CompactPicker } from 'react-color';
export default function Visualizer() {

    const { dataKeys, setData, data, compileForChart, chartData } = useContext(VisualizerContext)
    const [selectedDataKey, setSelectedDataKey] = useState('')
    const [rgbColor, selectColor] = useState('')
    const handleDataKeySelect = (event) => {
        window.alert(event.target.id)
    }
    const handleChartSelect = (event) =>{
        if (rgbColor.length > 2){
        compileForChart(event.target.id, rgbColor)
        selectColor('')
    } else{
        //error handle message
    }
    }
    
    const dataKeyFields = dataKeys.filter((d)=>d.sorts.length > 0).map((d)=>d.name)
    const handleChange = color =>{
        console.log(color.hex)
        selectColor(color.hex)
    }
    
    return (
        <div>
            <PageHeader id="2" >Visualizer</PageHeader>
    <p>{rgbColor}</p>
    <p>Upload a dataset in csv format</p>
            <CSVUpload setData={setData} />
            <p>Select a datakey to build your chart</p>
            <p id={selectedDataKey} onClick={handleChartSelect}>selected: {selectedDataKey}</p>
            {data.length > 0 ?? dataKeys.length > 0
                ?
                <div>
                    {dataKeys.map((d)=><DataKey name={d.name} sorts={d.sorts} type={d.type} />)

                    }
                    <FieldSelect fields={dataKeyFields} setField={setSelectedDataKey} />
                    <CompactPicker onChange={handleChange}/>
                </div>
                :
                <p>Data not ready</p>}

            {chartData.length > 0 ?
            <Chart data={chartData} />
                :
                <p>Chart not ready</p>
        }
        </div>
    )
}
