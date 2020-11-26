import styled from "styled-components"

export const PageHeader = styled.div`
font-size: 1.5em;
margin: 5px;
text-align: center;
`

export const DataPoint = styled.div`
font-family: 'Roboto Mono';
margin: 10px;
font-size: 1.2em;
text-align: center;
color: black;
`

export const ListPoint = styled.div`
font-family: 'Roboto Mono';
margin: 3px;
font-size: 1.2em;
text-align: center;
color: black;
`

export const SelectForm = styled.div`
display: flex;
flex-direction: row;
margin-left: 45%;
padding: 10px;
`

export const ChartHolder = styled.div`
margin-left: 10%;
margin-top:10px;
margin-bottom: 10px`

export const CenterDiv = styled.div`
content-align: center;
justify-content: center;
align-content: center;
text-align: center;
margin: 10px;`
export const SortKey = styled.div`
margin: 5px;
padding: 2px;
color: red;
border: solid 2px black;
`

export const CardKey = styled.div`
margin: 5px;
padding: 5px;
border-radius: 10px;
border: solid 3px blue;
width: 250px;
`
export const KeyHolder = styled.div`
@media (min-width: 316px){
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px;
    content-align: center;
    justify-content: center;
    align-content: center;
}
@media (max-width: 315px){
    margin: 10px;
    content-align: center;
    justify-content: center;
    align-content: center;
}
}

`
