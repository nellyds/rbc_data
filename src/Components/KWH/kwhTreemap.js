import React, {useState} from 'react'
import { Treemap, Hint} from 'react-vis';
import { regionList } from "../../Util/Constants"
export default function KwhTreemap(props) {
    const [infoNode, setinfoNode] = useState(null)
    const data = props.data.data
    const handleSelect = (event) =>{

        setinfoNode(event.data)
    }
    const resetSelect = () =>{
        setinfoNode(null)
    }
    let treeData = { "children": [], "title": "KWH per capita", "color": "rgba(0,0,0,0)" }
    
    regionList.map((d) => {
        let arr = {
            "children": data.filter((f) => d.name === f[7]).map((g) => {
                return {
                    "name": g[0],
                    "color": d.color,
                    "size": parseFloat(g[props.year + 1]),
                    "style": { "border": "thin solid white" }
                }
            })
        }
        treeData.children.push(arr)
    })
    return (
        <div>
            <Treemap colorType="literal" animation
                onLeafClick={handleSelect}
                onLeafMouseOut={resetSelect}
                on
                data={treeData} height={props.scrWidth} width={props.scrWidth} >

                </Treemap>
                {
                infoNode != null ?
                                <div>
                                    <p>{infoNode.name}</p>
                                    </div>

                             
: <div />
                }
        </div>
    )
}
