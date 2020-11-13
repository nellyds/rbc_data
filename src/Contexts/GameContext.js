import React, { createContext } from 'react'
import { readRemoteFile } from 'react-papaparse';

export const GameDataContext = React.createContext();

export default class DataContextProvider extends React.Component {
state = {
    parsedData: [],
    dataKeys:[],
    publishers: []
}


componentDidMount() {
    readRemoteFile('https://raw.githubusercontent.com/nellyds/dataSets/master/vgsales.csv', {
        complete: async (result) => {
            this.setState({dataKeys: result.data[0]})
            console.log(this.state.dataKeys)
            result = result.data.splice(1, result.data.length)
            this.getAllPublishers(result);
            this.getPublisherTotal(result)
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
        data.push(total)
    })
    console.log(data)
}
render() {
    return (
        <GameDataContext.Provider value={{ ...this.state }}>
            {this.props.children}
        </GameDataContext.Provider>

    )
}
}