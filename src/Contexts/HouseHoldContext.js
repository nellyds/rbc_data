import React, { createContext } from 'react'
import HouseHold from "../Pages/HouseHold"
import { readRemoteFile } from 'react-papaparse';
import axios from 'axios'
export const HouseHoldContext = createContext()
export default class HouseHoldContextProvider extends React.Component {

    state={
        countries: [],
        years: [],
        data: [],
        selectedCountryList: [],
        chartData: []
    }
    componentDidMount(){
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/one-person-households-vs-gdp-per-capita.csv', {
            complete: async ( result) =>{
                this.getAllCountriesAndYears(result.data)
                await console.log('ready')
            }
        })
    }
    getAllCountriesAndYears = (result) =>{
        let yearSet = new Set();
        let countrySet = new Set()
        result.map((d)=>{
            countrySet.add((d[0]))
            yearSet.add(d[2])
        })
        this.setState({countries: [...countrySet]})
        this.setState({years: [...yearSet]})
    }
    setCountryDataToFetch = async (arg) =>{
        this.fetchDataByCountry(arg)
    }
    getCountryData = (data, country) =>{
        let result = data.filter((d)=> d[0] === country && d[5] !== "" && d[6] !== "").map((d)=>{
            return{
                totalPopulation: Math.floor(parseFloat(d[3])) * .001, gdp: Math.floor(parseFloat(d[5]) * .001) , share: parseFloat(d[6]), year: parseInt(d[2]), name: country
            }
        })
        return result
    }

    fetchDataByCountry = async (countryList) =>{
        let data = []
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/one-person-households-vs-gdp-per-capita.csv', {
            complete: async ( result) =>{
                countryList.map((d)=>{ 
                    data.push({name: d, data: this.getCountryData(result.data, d)})
            })}})
        await this.setState({chartData: data})
    }
    


    render(){
        return(
            <HouseHoldContext.Provider value={{...this.state, setCountryDataToFetch: this.setCountryDataToFetch}}>
                {this.props.children}
            </HouseHoldContext.Provider>
        )
    }
}

export function HouseHoldDataContainer(){
    return (
        <HouseHoldContextProvider>
                <HouseHold />
        </HouseHoldContextProvider>
    )
}