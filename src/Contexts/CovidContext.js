import React from 'react'
import axios from 'axios';
import USCovid from "../Pages/USCovid"
export const CovidContext = React.createContext();

export default class CovidContextProvider extends React.Component {

  state = {
    dataReady: false,
    current: null,
    pastWeek: [],
    pastMonth: [],
    worldTotal: {},
    worldData: []
  }
  componentDidMount = () => {
    this.getDaily();
    this.getPastWeek();
    this.getPastMonth();
    this.getWorldTotal();
    // this.getWorldData();

  }
  getPastMonth = async () => {
    const result = await axios.get('https://api.covidtracking.com/v1/us/daily.json').catch(error => { console.log(error.message) })
    const month = result.data.splice(0, 30)
    this.setState({ pastMonth: month })
  }
  getPastWeek = async () => {
    const result = await axios.get('https://api.covidtracking.com/v1/us/daily.json').catch(error => { console.log(error.message) })
    const week = result.data.splice(0, 7);
    this.setState({ pastWeek: week })
  }
  getDaily = async () => {
    const result = await axios.get('https://api.covidtracking.com/v1/us/daily.json').catch(error => { console.log(error.message) })
    this.setState({ current: result.data[0] })
  }
  getWorldTotal = async () => {
    const result = await axios.get('https://api.covid19api.com/world/total').catch(error => { console.log(error.message) })
    this.setState({ worldTotal: result.data })
  }
  //   getWorldData = async () =>{
  //       let calls = []
  //       for (let i=0; i< 4; i++){
  //         calls.push(this.getCountryData(countryList[i]))
  //       }
  //       Promise.all(calls).then(result =>{
  //           this.setState({worldData: result})
  //       })
  //   }
  //   getCountryData = async (country)=>{
  //     let result = await axios.get('https://api.covid19api.com/live/country/'+country+'/status/confirmed')
  //     return result.data[0]
  // }

  render() {
    return (
      <CovidContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </CovidContext.Provider>
    )
  }
}

export function CovidContextContainer() {
  return (
    <CovidContextProvider>
      <USCovid />
    </CovidContextProvider>
  )

}