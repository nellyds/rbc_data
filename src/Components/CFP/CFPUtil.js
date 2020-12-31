export const MapData= (props) => {
    const year = props.year
    const aData = props.regionData.filter((d) => d.name === 'Asia')
    [0].data.filter((d) => d.year === parseInt(year))[0].data.map((d, i) => {
        return {
            x: d.gdp,
            y: d.cfp,
            country: d.country,
            size: d.pop !== "no data available" ? parseInt(d.pop) : 
            2
            ,
            index: 0
        }
    })
    const fData = props.regionData.filter((d) => d.name === 'Africa')
    [0].data.filter((d) => d.year === parseInt(year))[0].data.map((d, i) => {
        return {
            x: d.gdp,
            y: d.cfp,
            country: d.country,
            size: d.pop !== "no data available" ? parseInt(d.pop) : 
            2
            ,
            index: 1

        }
    })
    const eData = props.regionData.filter((d) => d.name === 'Europe')
    [0].data.filter((d) => d.year === parseInt(year))[0].data.map((d, i) => {
        return {
            x: d.gdp,
            y: d.cfp,
            country: d.country,
            size: d.pop !== "no data available" ? parseInt(d.pop) : 
            2,
            index: 2

        }
    })
    const naData = props.regionData.filter((d) => d.name === 'North America')
    [0].data.filter((d) => d.year === parseInt(year))[0].data.map((d, i) => {
        return {
            x: d.gdp,
            y: d.cfp,
            country: d.country,
            size: d.pop !== "no data available" ? parseInt(d.pop) : 
            2,
            index: 3

        }
    })
    const saData = props.regionData.filter((d) => d.name === 'South America')
    [0].data.filter((d) => d.year === parseInt(year))[0].data.map((d, i) => {
        return {
            x: d.gdp,
            y: d.cfp,
            size: d.pop !== "no data available" ? parseInt(d.pop) : 2,
            country: d.country,
            index: 4

        }
    })

    const oData = props.regionData.filter((d) => d.name === 'OECD')
    [0].data.filter((d) => d.year === parseInt(year))[0].data.map((d, i) => {
        let initPop = 2
        return {
            x: d.gdp,
            y: d.cfp,
            country: d.country,
            size: d.pop !== "no data available" ? parseInt(d.pop) :initPop,
            index: 5
        }
    })
    const bData = props.regionData.filter((d) => d.name === 'BRIC')
    [0].data.filter((d) => d.year === parseInt(year))[0].data.map((d, i) => {
        let initPop = 2
        return {
            x: d.gdp,
            y: d.cfp,
            country: d.country,
            size: d.pop !== "no data available" ? parseInt(d.pop) :initPop,
            index: 5
        }
    })
    return [
        {data: aData, color: 'rgb(147,223,200)', index: 0}, 
        {data:  fData, color: 'purple', index: 1},
    {data:eData, color: 'rgb(147,223,223)', index: 2}, 
    {data:saData, color: 'orange', index: 3},
    { data: naData, color: 'rgb(20,20,180)', index: 4},
    {data: oData, color: 'rgb(223,147,209)', index: 5}, 
    {data: bData, color: '#FF00C6', index: 6}
]
}