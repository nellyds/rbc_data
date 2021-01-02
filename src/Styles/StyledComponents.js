import styled from "styled-components"

export const PageHeader = styled.div`
font-size: 1.5em;
margin: 5px;
text-align: center;
`

export const Paragraph = styled.div`
@media (min-width: 416px){
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px;
    width: 40%;
    margin-left: 30%;
    content-align: center;
    justify-content: center;
    align-content: center;
}
@media (max-width: 415px){
    margin: 5px;
    font-size: .9em;
    content-align: center;
    justify-content: center;
    align-content: center;
}
}
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
export const VariableChartBox = styled.div`
display: flex;
content-align: center;
justify-content: center;
`


export const MultiSelectBox = styled.div`
margin: 5px;
display: flex;
flex-direction: row;
content-align: center;
justify-content: center;
align-content: center;
`

export const ChipBox = styled.div`
margin: 5px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`

export const center = styled.div`
width: 400px;
border: solid 2px black;
background-color: rgba(0,0,0,.1)

`

export const CFPCopyDiv = styled.div`
    font-size: .8em;
    text-align: right;
padding: 10px;
background-color: rgba(0,0,0,.05);
    height:125px;
`

export const NEXT = "NEXT";
export const PREV = "PREV";

export const Item = styled.div`
  background-image: ${(props) => `url(${props.img})`};
`;

export const CarouselContainer = styled.div`
  display: flex;
  transition: ${(props) => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${(props) => {
    if (!props.sliding) return "translateX(calc(-100% - 0px))";
    if (props.dir === PREV) return "translateX(calc(2 * (-100% -0px)))";
    return "translateX(0%)";
  }};
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  box-shadow: 5px 5px 20px 7px rgba(168, 168, 168, 1);
`;

export const CarouselSlot = styled.div`
  flex: 1 0 100%;
  font-size: 10px;
  order: ${(props) => props.order};
`;

export const SlideButton = styled.button`
    color: #ffffff;
  font-family: 'Roboto Mono';
    font-size: 12px;
    padding: 10px;
    background-color: black;
    border: 1px solid white;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
  margin-top: 10px;
  text-decoration: none;
  float: ${(props) => props.float};

  &:active {
    position: relative;
    top: 1px;
  }
  &:focus {
    outline: 0;
  }
`;
