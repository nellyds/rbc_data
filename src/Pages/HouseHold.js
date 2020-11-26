import React, { useContext, useState } from 'react'
import { HouseHoldContext } from "../Contexts/HouseHoldContext"
import FilteredMultiSelect from 'react-filtered-multiselect'
import HouseHoldBubble from "../Components/HouseHold/HouseHoldBubble"
export default function HouseHold() {
    const { countries, setCountryDataToFetch, chartData} = useContext(HouseHoldContext)
    const [selectedCountryList, setSelectedCountryList] = useState([])
    const [errors, setErrorList] = useState([])
    const countryList = countries.map((d) => {
        return {
            name: d,
            value: d
        }
    })
    const handleSelectionChange = (event) => {
        if (selectedCountryList.length < 10) {
            let country = event[0].name
            let arr = selectedCountryList
            setSelectedCountryList([...arr, country])
        } else {
            setErrorList([...errors, 'Maximum number of countries to compare is 10'])
        }
    }

    const removeCountry = (event) =>{
        let arr = selectedCountryList.filter((d) => d !== event.target.textContent)
        setSelectedCountryList([...arr])
    }
    const fetchData = () => {
        setCountryDataToFetch(selectedCountryList)
    }
    return (
        <div>
            {countries.length > 0 ?
                <div>
                    <FilteredMultiSelect
                        onChange={handleSelectionChange}
                        options={countryList}
                        textProp="name"
                        valueProp="value"
                    />
                    {selectedCountryList.map((d,i)=><p key={d} onClick={removeCountry} id={i}>{d}</p>)}
                    <p onClick={fetchData}>Fetch Data</p>
                    <HouseHoldBubble data={chartData} />
                </div>
                :
                <p>
                    Fetching Country List...
            </p>

            }
        </div>
    )
}
