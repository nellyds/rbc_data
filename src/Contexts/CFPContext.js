import React, { createContext } from 'react'
import { readRemoteFile } from 'react-papaparse';
import CFP from "../Pages/CFP"
import {countries, Europe, Asia, Africa, nAmerica, sAmerica, OECD, BRICS} from "../Util/Constants"
export const CFPContext = React.createContext();

export default class CFPContextProvider extends React.Component {
    state = {
        years: ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012"
        ,"2013","2014","2015","2016","2017"],
        parsedData: [],
        cfpData: [],
        gdpData: [],
        popData: [],
        regionData: []
    }
    componentDidMount() {
        this.fetchDataSets()
    }
    async fetchDataSets() {
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/co-emissions-per-capita%20(1).csv', {
            complete: async (result) => {
                result = result.data.splice(1, result.data.length)
                await this.setState({ cfpData: result })
            }
        })
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/real-gdp-per-capita-PennWT.csv', {
            complete: async (result) => {
                result = result.data.splice(1, result.data.length)
                await this.setState({ gdpData: result })
            }
        })
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/new.csv', {
            complete: async( result) =>{
                await this.setState({popData: result.data})
            }
        })
    }

    parseData = (cfpData, gdpData, popData, years) =>{   
    let groups = [
        {name: 'Europe', arr: Europe},
        {name: 'Africa', arr: Africa},
        {name: 'Asia', arr: Asia},
        {name: 'North America', arr: nAmerica},
        {name: 'South America', arr: sAmerica},
        {name: 'OECD', arr: OECD},
        {name: 'BRIC', arr: BRICS}
    ]

    let regionData = groups.map((g) =>{
        let groupObj = {}
        groupObj.name = g.name;
        let groupData = years.map((d) => {
            let obj = {}
            obj.year = parseInt(d)
            obj.data = g.arr.map((e) => this.getDataByYear(cfpData, gdpData, popData, e, d))
            return obj
        })
        groupObj.data = groupData
        return groupObj
    })
    this.setState({regionData: regionData})

    }
    getDataByYear = (cfpData, gdpData, popData, country, year) =>{
        let obj = {}
        obj.year = parseInt(year);
        obj.country = country
       
        obj.cfp = cfpData.filter((d) => d[0] === country && d[2] === year) !== undefined > 0 
        && cfpData.filter((d) => d[0] === country && d[2] === year)[0][3] !== undefined
        ? parseFloat(obj.cfp = cfpData.filter((d) => d[0] === country && d[2] === year)[0][3]) : "No data available"
        obj.gdp = gdpData.filter((d) => d[0] === country && d[2] === year) !== undefined  
        && gdpData.filter((d) => d[0] === country && d[2] === year)[0][3] !== undefined
        ? parseFloat(obj.gdp = gdpData.filter((d) => d[0] === country && d[2] === year)[0][3]) * .001 : "No data available"
        try{
            obj.pop= parseFloat(popData.filter((d) => d[0] === country && d[2] === year)[0][3]) * .0001
        } catch (e){
            obj.pop = parseFloat(popData.filter((d) => d[0] === country && d[2] === '2000')[0][3]) * .0001
        }
        return obj
    }

    render() {
        return (
            <CFPContext.Provider value={{ ...this.state, compile: this.parseData }}>
                {this.props.children}
            </CFPContext.Provider>

        )
    }

}

export function CFPContainer() {
    return (
        <CFPContextProvider>
            <CFP />
        </CFPContextProvider>
    )
}

