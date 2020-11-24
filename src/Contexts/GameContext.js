import React, { createContext } from 'react'
import { readRemoteFile } from 'react-papaparse';
import GameSales from "../Pages/GameSales"
export const GameDataContext = React.createContext();

export default class DataContextProvider extends React.Component {
    state = {
        parsedData: [],
        dataKeys: [],
        publishers: [],
        topPublishers: [],
        dataReady: false,
        topTwenty: [],
        genres: [],
        platforms: []
    }


    componentDidMount() {
        readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/vgsales.csv', {
            complete: async (result) => {
                this.setState({ dataKeys: result.data[0] })
                result = result.data.splice(1, result.data.length)
                this.getAllPublishers(result);
                this.getPublisherTotal(result);
                this.getTopTwenty(result)
                await this.setState({ dataReady: true })
            }
        })
    }


    getAllGenres = (result) => {

    }
    getAllPublishers = (result) => {
        let platformSet = new Set()
        let genreSet = new Set()
        let publisherSet = new Set();
        result.map((d) => {
            publisherSet.add(d[5])
            platformSet.add(d[2])
            genreSet.add(d[4])
        })
        this.setState({ publishers: [...publisherSet] })
        this.setState({ genres: [...genreSet] })
        this.setState({ platforms: [...platformSet] })

    }

    getPublisherTotal = (result) => {
        let publist = this.state.publishers;
        let data = []
        publist.map((d) => {
            let total = {}
            let obj = result.filter((f) => f[5] === d)
            total[d] = obj.length
            let salesTotal = 0;
            for (let i = 0; i < obj.length; i++) {
                salesTotal += parseInt(obj[i][10])
            }
            let pubData = {}
            pubData[d] = { title: obj.length, unitTotal: salesTotal }
            data.push(pubData)
        })
        this.setState({ topPublishers: [...data] })
    }

    getTopTwenty = (result) => {
        result = result.slice(0, 20)
        let clean = result.map((d) => {
            return {
                title: d[1],
                globalTotal: d[10],
                platform: d[2],
                na: d[6],
                eu: d[7],
                jp: d[8]
            }
        })
        this.setState({ topTwenty: clean })
    }

    render() {
        return (
            <GameDataContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </GameDataContext.Provider>

        )
    }
}

export function GameContextContainer(){
    return(
        <DataContextProvider>
            <GameSales />
        </DataContextProvider>
    )
}