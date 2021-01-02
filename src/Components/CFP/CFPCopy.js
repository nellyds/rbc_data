import React from 'react'
import {CFPCopyDiv} from "../../Styles/StyledComponents"
import {CFPcopy, CFPPara} from "../../Util/Constants"
import Carousel from "../Forms/Carousel"
export default function (props) {
           
    return (
        <div>
            <Carousel setCopyIndex = {props.setCopyIndex}
                copyIndex = {props.copyIndex}
            >
                {CFPcopy.map((d) => <p >{d}</p>
                )}
            </Carousel>


        </div>
    )
}
