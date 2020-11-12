import moment from 'moment'

export const getField = (data, field) =>{
    let result = {}
    let dataArr = []
    for (let i=0; i < data.length; i++){
        dataArr.push({'date': data[i].date, value: data[i][field]})
    }
    result[field] = dataArr
    return result
}

export const getAverage = (data, field) =>{
let total = 0;
for(let i=0; i< data.length; i++){
    total += data[i][field]
}
return total / data.length;
}

export const parseDate = (date) =>{
    return date.toString().slice(0,4)+"/"+ date.toString().slice(4,6)+ "/"+ date.toString().slice(6,8)
}

