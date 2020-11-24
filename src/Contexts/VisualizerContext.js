import React, { createContext} from 'react'
import Visualizer from "../Pages/Visualizer"
export const VisualizerContext = createContext()
export default class VisualizerContextProvider extends React.Component {

    state = {
        dataKeys: [],
        sorts: [],
        data: [],
        chartData: []

    }
    setData = async(rawData) =>{
        await this.setState({data: [...rawData]})
        await this.getDataKeys()
    }

    getDataKeys = async () =>{
        let keyArray = this.state.data[0].data
        let result = []
        for (let i=0; i < keyArray.length; i++){
            let sortedKey = this.getSorts(i)
            let parsedTypes = this.getType(i)
            result.push({
                name: keyArray[i],
                type: parsedTypes,
                sorts: sortedKey,
                index: i
            })
        }
        this.setState({dataKeys: [...result]})
    }

    getSorts = (index) =>{
        let values = []
        for (let i=1; i < 100; i++){
            values.push(this.state.data[i].data[index])
        }
        let valueSet = new Set(values)
        if (Array.from(valueSet).length < (.5 * values.length)){
            return this.getColumnSet(index)
        } else return []
    }
    getColumnSet = (index) =>{
        return Array.from(new Set(this.state.data.map((d) =>d.data[index])))
    }

    getType = (index) =>{
        return [this.checkForNumber(index), this.checkForDate(index), this.checkForYear(index), this.checkForMonthYear(index)].filter((d) =>d.value === true)
    }

    checkForNumber = (index) =>{
        let regex = /^\-?(\d+\.?\d*|\d*\.?\d+)$/
        return {name: 'isNumber', value: regex.test(this.state.data[4].data[index]) } 
    }
    checkForMonthYear = (index) =>{
        let regex = /[\d]{2}\/[\d]{4}/
        return {name: 'isMonthYear', value: regex.test(this.state.data[6].data[index])}
    }

    checkForDate = (index) =>{
        const regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
        return {name: 'isDate', value: regex.test(this.state.data[2].data[index])}
    }
    checkForYear = (index) =>{
        const regex = /(?:(?:19|20)[0-9]{2})/
        return {name: 'isYear', value: regex.test(this.state.data[2].data[index])}
    }

    compileForChart = async (dataKey, color) =>{
        //check if dataKey has isNumber
        //check if dataKey has sort
        const {name, index, sorts, type} = (this.state.dataKeys.filter((d) => d.name===dataKey))[0]
        let data = []
        if (sorts.length> 0){
        sorts.map((d)=>{
            let result = this.state.data.filter((f)=> f.data[index] === d)
            data.push({x: d, y: result.length})
        }
        )
    }
        if (type === 'isNumber'){
            
        }
        let obj = {data: data}
        obj.field = name
        obj.color = color
        await this.setState({chartData: [...this.state.chartData,obj]})
    }
    render() {
        return (
            <VisualizerContext.Provider value={{ ...this.state, getDataKeys: this.getDataKeys, compileForChart: this.compileForChart, 
            setData: this.setData }}>
                {this.props.children}
            </VisualizerContext.Provider>
        )
    }

}

export function VisualizerContainer(){
    return(
        <VisualizerContextProvider>
            <Visualizer />
        </VisualizerContextProvider>

    )
}
