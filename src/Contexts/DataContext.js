import React, { createContext } from 'react'
import { readRemoteFile } from 'react-papaparse';
import moment from 'moment';
export const DataContext = React.createContext();

export default class DataContextProvider extends React.Component {
    state = {
        parsedData: [],
        monthRange: [],
        dataReady: false,
        monthlyData: [],
        races: []
    }

    componentDidMount() {
        readRemoteFile('https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/fatal-police-shootings-data.csv', {
            complete: async (result) => {
                await this.parseData(result.data)
                await this.getMonthRange(result.data)
                await this.getCleanMonthlyData(this.state.parsedData, this.state.monthRange)
                await this.setState({ dataReady: true })
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

    getCleanMonthlyData = async (data, monthRange) => {
        const result = await monthRange.map((item) => {
            let monthsData = data.filter((d) => d.date === item)
            return {
                date: item,
                total: monthsData.length,
                signs_of_mental_illness: monthsData.filter((d) => d.signs_of_mental_illness === "True").length,
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

    render() {
        return (
            <DataContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </DataContext.Provider>

        )
    }
}