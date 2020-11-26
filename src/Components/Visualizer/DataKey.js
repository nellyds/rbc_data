import React, { useState, useEffect } from 'react'
import { CardKey } from "../../Styles/StyledComponents"
import { Animated } from "react-animated-css";
export default function DataKey(props) {
    const dataKeys = props.dataKeys
    const type = props.type
    const sorts = props.sorts

    const [isTime, setIsTime] = useState(false)
    const [isNumber, setIsNumber] = useState(false)
    useEffect(() =>
        checkType(),

    )
    const checkType = () => {
        if (type.filter((d) => d.name === "isYear").length > 0) { setIsTime(true) }
        if (type.filter((d) => d.name === "isNumber").length > 0) { setIsNumber(true) }
    }

    return (
        <div>
            <Animated animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
                <CardKey>
                    <p>{props.name}</p>
                    {isTime ?
                        <p>This table has chronological values.  You can sort the values using the dates</p>
                        :
                        <div />
                    }
                    {isNumber ?
                        <p>This column are integers.  A good visualization will compare these values.  </p>
                        :
                        <p />
                    }
                    <p onClick={() => props.setKey(props.name)}>Build a chart using this dataKey. </p>
                </CardKey>
            </Animated>


        </div>



    )
}


