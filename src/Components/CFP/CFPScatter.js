import React, { useState } from 'react'
import FieldSelectObj from "../Forms/FormUploadObj"
import { CFPLegend, CFPFields } from "../../Util/Constants"
import { MapData } from "./CFPUtil"
import { XYPlot, XAxis, YAxis, MarkSeries, DiscreteColorLegend, LineMarkSeries, Hint } from 'react-vis'
export default function CFPScatter(props) {
    const [detail, setDetail] = useState(null)
    const year = props.year
    let mapped = MapData(props)
    let compare = mapped.splice(5, 6)
    mapped = mapped.splice(0, 4)
    const handleDetail = (data) => {
        setDetail({ gdp: data.x, cfp: data.y, country: data.country })
        props.setIndex(data.index)

    }

    return (
        <div>
            <FieldSelectObj fields={CFPFields} setField={props.setIndex} />
            {props.scrWidth > 320 ?
                <DiscreteColorLegend
                    style={{ right: '50px', top: '10px', backgroundcolor: 'White' }}
                    orientation="horizontal"
                    items={CFPLegend}
                /> : null}
            <XYPlot width={props.scrWidth} yDomain={[0, 25]}
                xDomain={[0, 80]} height={props.scrWidth}>
                <XAxis
                    style={props.copyIndex >= 1 ? { opacity: 1 } : { opacity: .5 }}
                    tickFormat={Number}
                    position={'middle'}
                    title="Gross Domestic Product per Capita (10K)"
                />

                {detail ? <Hint align={{ horizontal: 'left', vertical: 'top'}} value={detail} /> : null}
                <YAxis tickFormat={Number}

                    style={props.copyIndex >= 0 ? { opacity: 1 } : { opacity: .5 }}
                    title="Carbon Foot Print Per Capita" />
                {mapped.map((d) =>
                    <MarkSeries id='0' class='0'
                        animation
                        color={props.selectIndex === d.index ? d.color : 'rgba(0,0,255,.2)'}
                        opacity={props.selectIndex <= 4 || props.copyIndex === -1 ? 1 : .1}
                        data={d.data}
                        onValueMouseOver={(data) => handleDetail(data)}
                        onValueMouseOut={() => setDetail(null)}
                    />)
                }
                {compare.map((d) => <MarkSeries
                    animation
                    color={props.selectIndex === d.index ? 'red' : 'rgba(0,0,255,.1)'}
                    opacity={props.selectIndex >= 4 ? 1 : 0}
                    data={d.data}
                    onValueMouseOver={(data) => handleDetail(data)}
                    onValueMouseOut={() => setDetail(null)} />)

                }

            </XYPlot>

        </div>
    )
}
