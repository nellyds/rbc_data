import React, { createContext } from 'react'
import LandUse from "../Pages/LandUse"
import { readRemoteFile } from 'react-papaparse';
export const LandUseContext = createContext()
export default class LandUseContextProvider extends React.Component {

    state= {
        cropData:[],
        years: [],
        crops: [],
        sortedData: []
    }
    componentDidMount(){
    
        readRemoteFile(    'https://raw.githubusercontent.com/nellyds/dataSets/master/global-agricultural-land-use-by-major-crop-type.csv', {
            complete: async ( result) =>{
                let arr = result.data.slice(1, result.data.length)
                this.getAllYears(result.data)
                this.setState({cropData: arr})
                await console.log('ready')
                this.filterDataByYear()
            }
        })
    }

    getAllYears = async (data) =>{
        let yearSet = new Set();
        let cropSet = new Set();
        data.map((d)=> {
        yearSet.add(d[1])
        cropSet.add(d[0])
        })
        await this.setState({years: [...yearSet]})
        await this.setState({crops: [...cropSet]})
    }

    filterDataByYear = async () =>{
        let sorted = []
        let cropData = this.state.cropData
        let years = this.state.years
        years.map((d) =>{
            let obj = {}
            // obj[data] = cropData.filter((c) => d === c[1])
            // obj[year] = d
            sorted.push({data: cropData.filter((c) => d === c[1]), year: d})
        })
        await this.setState({sortedData: sorted})
    }

    render(){
        return(
            <LandUseContext.Provider value={{...this.state}}>
            {this.props.children}
            </LandUseContext.Provider>
        )
    }
}

export function LandUseContainer(){
    return(
        <LandUseContextProvider>
            <LandUse />
            </LandUseContextProvider>
    )
}

