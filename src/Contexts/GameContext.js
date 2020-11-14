import React, { createContext } from 'react'
import { readRemoteFile } from 'react-papaparse';

export const GameDataContext = React.createContext();

export default class DataContextProvider extends React.Component {
state = {
    parsedData: [],
    dataKeys:[],
    publishers: [],
    topPublishers: [],
    dataReady: false
}


componentDidMount() {
    readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/vgsales.csv', {
        complete: async (result) => {
            this.setState({dataKeys: result.data[0]})
            console.log(this.state.dataKeys)
            result = result.data.splice(1, result.data.length)
            this.getAllPublishers(result);
            this.getPublisherTotal(result)
            await this.setState({dataReady: true})
        }
    })
}

getAllPublishers = (result) =>{
    let publisherSet = new Set();
    result.map((d) =>{
        publisherSet.add(d[5])
    })
    this.setState({publishers: [...publisherSet]})
}

getPublisherTotal = (result) =>{
    let publist = this.state.publishers;
    let data = []
    publist.map((d)=>{
        let total = {}
        let obj = result.filter((f) => f[5] === d)
        total[d] = obj.length
        let salesTotal = 0;
        for (let i=0; i< obj.length; i++){
            salesTotal += parseInt(obj[i][10])
        }
        let pubData = {}
        pubData[d] = {title: obj.length, unitTotal: salesTotal}
        data.push(pubData)
    })
    this.setState({topPublishers: [...data]})
}

render() {
    return (
        <GameDataContext.Provider value={{ ...this.state }}>
            {this.props.children}
        </GameDataContext.Provider>

    )
}
}