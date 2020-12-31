import React, { useState } from 'react'
import FieldSelectObj from "../Forms/FormUploadObj"
import { CFPLegend, CFPFields } from "../../Util/Constants"
import { MapData } from "./CFPUtil"
import { XYPlot, XAxis, YAxis, MarkSeries, DiscreteColorLegend, LineMarkSeries, Hint } from 'react-vis'
import { SportsRugbySharp } from '@material-ui/icons'
export default function CFPScatter(props) {
    const [detail, setDetail] = useState(null)
    const [selectIndex, setIndex] = useState(null)
    const year = props.year
    let mapped = MapData(props)
    let compare = mapped.splice(5,6)
    mapped = mapped.splice(0,4)
    const handleDetail = (data) => {
        setIndex(data.index)
        setDetail({ gdp: data.x, cfp: data.y, country: data.country })
        setIndex(data.index)
    }
    return (
        <div>
            <FieldSelectObj fields={CFPFields} setField={setIndex} />
            {props.scrWidth > 320 ? 
                <DiscreteColorLegend
                    style={{ right: '50px', top: '10px', backgroundcolor: 'White' }}
                    orientation="horizontal"
                    items={CFPLegend}
                /> : null}
            <XYPlot width={props.scrWidth} yDomain={[0, 25]}
                xDomain={[0, 80]} height={props.scrWidth}>
                <XAxis
                    tickFormat={Number}
                    position={'middle'}
                    title="Gross Domestic Product per Capita (10K)"
                />


                <YAxis tickFormat={Number}
                    title="Carbon Foot Print Per Capita" />
                {mapped.map((d) =>
                    <MarkSeries id='0' class='0'
                        animation
                        color={selectIndex === d.index ? d.color : 'rgba(0,0,255,.2)'}
                        opacity={selectIndex <= 4 ? 1 : .1}
                        data={d.data}
                        onValueMouseOver={(data) => handleDetail(data)}
                        onValueMouseOut={() => setDetail(null)}
                    />)
                }
                {compare.map((d) =><MarkSeries 
                                    animation
                                    color={selectIndex === d.index ? 'red' : 'blue'}
                                    opacity={selectIndex > 4 ? 1 : 0}
                                    data={d.data}
                                    onValueMouseOver={(data) => handleDetail(data)}
                                    onValueMouseOut={() => setDetail(null)}/>) 

                }
                {detail ? <Hint value={detail} /> : null}
            </XYPlot>

        </div>
    )
}
