import React, { createContext } from 'react'
import { readRemoteFile } from 'react-papaparse';
import moment from 'moment';
import { races } from "../Util/Constants"
export const DataContext = React.createContext();

export default class DataContextProvider extends React.Component {
    state = {
        parsedData: [],
        monthRange: [],
        dataReady: false,
        monthlyData: [],
        shootingDataReady: false,
        raceData: [],
        yearRange: []
    }

    componentDidMount() {
        readRemoteFile('https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/fatal-police-shootings-data.csv', {
            complete: async (result) => {
                result = result.data.splice(1, result.data.length)
                await this.parseData(result)
                await this.getMonthRange(result)
                this.getYearRange(result)
                 this.getCleanMonthlyData(this.state.parsedData, this.state.monthRange)
                 this.getDataByRace(this.state.parsedData)
                await this.setState({ shootingDataReady: true })
            }
        })
    }
    parseData = async (result) => {
        let parsed = await result.map((item) => {
            return {
                date: moment(item[2]).month() + "/" + moment(item[2]).year(),
                month: moment(item[2]).month(),
                year: moment(item[2]).year(),
                armed: item[4],
                city: item[8],
                race: item[7],
                signs_of_mental_illness: item[10],
                threat_level: item[11],
                flee: item[12],
                coordinates: [parseFloat(item[14]), parseFloat(item[15])]
            }
        })
        this.setState({ parsedData: parsed })
        await console.log('gotData')
    }

    getMonthRange = async (result) => {
        let set = new Set();
        result.map((item) =>
            set.add(moment(item[2]).month() + "/" + moment(item[2]).year()))
        this.setState({ monthRange: [...set] })
        console.log('gotMonths')
    }

    getYearRange = async (result) =>{
        let set = new Set();
        result.map((item) => set.add(moment(item[2]).year()))
        this.setState({yearRange: [...set]})
    }

    getCleanMonthlyData = async (data, monthRange) => {
        const result = await monthRange.map((item) => {
            let monthsData = data.filter((d) => d.date === item)
            return {
                date: item,
                year: item.substring(item.length-4),
                total: monthsData.length,
                signs_of_mental_illness: monthsData.filter((d) => d.signs_of_mental_illness !== "unarmed").length,
                armed: monthsData.filter((d) => d.armed === "True").length,
                race: {
                    w: monthsData.filter((d) => d.race === "W").length,
                    b: monthsData.filter((d) => d.race === "B").length,
                    h: monthsData.filter((d) => d.race === "H").length
                }
            }
        })
        this.setState({ monthlyData: [...result] })
        await console.log('monthly data calculated')
    }

    getDataByRace = async (data) => {
        const result = []
        for (let i = 0; i < races.length; i++) {
            const raceData = data.filter((d) => d.race === races[i])
            let obj = {
                total: raceData.length,
                armed: raceData.filter((d) => d.armed !== "unarmed").length,
                signs_of_mental_illness: raceData.filter((d) => d.signs_of_mental_illness === "True").length,
                flee: raceData.filter((d) => d.flee !== "Not fleeing").length
            }
            result[races[i]] = obj
        }
        this.setState({ raceData: [...result] })
    }

    render() {
        return (
            <DataContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </DataContext.Provider>

        )
    }
}