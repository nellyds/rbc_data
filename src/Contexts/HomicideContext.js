import React from 'react'
import { readRemoteFile } from 'react-papaparse';
import Homicide from "../Pages/Homicides"
import moment from 'moment'
export const HomicideContext = React.createContext();

export default class HomicideContextProvider extends React.Component {


    state = {
        countries: [],
        years: [],
        gdpData: [],
        homicideData: []
    }

    componentDidMount() {
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/homicide-rate.csv', {
            complete: async (result) => {
                this.getAllCountriesAndYears(result.data)
            }
        })
    }

    getAllCountriesAndYears = (result) => {
        let yearSet = new Set();
        let countrySet = new Set()
        result.map((d) => {
            countrySet.add((d[0]))
            yearSet.add(d[2])
        })
        this.setState({ countries: [...countrySet] })
        this.setState({ years: [...yearSet] })
    }

    compileChartData = async (countryList) => {
        let homicide = await this.fetchHomicidesByCountry(countryList)
        let gdp = await this.fetchGDPByCountry(countryList)
        this.setState({ homicideData: homicide })
        this.setState({ gdpData: gdp })
    }

    fetchHomicidesByCountry = async (countryList) => {
        let data = []
        try{
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/homicide-rate.csv', {
            complete: async (result) => {
                countryList.map((d) => {
                    data.push({ name: d, homicideData: this.getHomicideData(result.data, d) })
                })
            }
        })
    } catch {
         console.log('something')
    }
        return data
    }

    fetchGDPByCountry = async (countryList) => {
        let data = []
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/real-gdp-per-capita-PennWT.csv', {
            complete: async (result) => {
                countryList.map((d) => {
                    data.push({ name: d, gdpData: this.getGDPData(result.data, d) })
                })
            }
        })
        return data
    }

    getHomicideData =  (data, country) => {
        let result =  data.filter((d) => d[0] === country).map((d) => {
            return {
                x: parseInt(d[2]), y: parseFloat(d[3]), name: country, year: d[2], homicides: parseFloat(d[3])
            }
        })
        return result
    }

    getGDPData = (data, country) => {
        console.log('reached')
        let result =  data.filter((d) => d[0] === country && moment(d[2]).isAfter(moment('1989')) && d[3] !== "").map((d) => {
         
            return {
                x: parseInt(d[2]), y: parseFloat(d[3]),name: country, year: d[2], gdp: parseFloat(d[3])
            }
        })
        return result
    }

    render() {
        return (
            <HomicideContext.Provider value={{ ...this.state, compileChartData: this.compileChartData }}>
                {this.props.children}
            </HomicideContext.Provider>
        )
    }
}

export function HomicideContainer() {
    return (
        <HomicideContextProvider >
            <Homicide />
        </HomicideContextProvider>
    )
}


