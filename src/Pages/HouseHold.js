import React, { useContext, useState } from 'react'
import { HouseHoldContext } from "../Contexts/HouseHoldContext"
import { PageHeader, ChipBox, Paragraph } from "../Styles/StyledComponents"
import MultiSelect from "../Components/Forms/MultiSelect"
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import HouseHoldBubble from "../Components/HouseHold/HouseHoldBubble"

export default function HouseHold() {
    const { countries, setCountryDataToFetch, chartData } = useContext(HouseHoldContext)
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

    const removeCountry = (event) => {
        console.log(event)
        let arr = selectedCountryList.filter((d) => d !== event.target.id)
        if (selectedCountryList.length === 1) {
            setSelectedCountryList([])
        }
        setSelectedCountryList([...arr])
    }
    const fetchData = () => {
        setCountryDataToFetch(selectedCountryList)
    }

    return (
        <div>
            <PageHeader> HouseHold Composition and GDP</PageHeader>
            <Paragraph>Getting a little bit more comfortable with the process of parsing and sorting data from CSVs, I wanted to focus on maybe adding more interaction.
            On the simplest level, the dataset to pull from massive, so I make repeated requests to the the url where the CSV is hosted.  The whole CSV was more than 1.01 mb
            which wasn't what React Context seemingly plays well with.  While the sheer volume of rows meant there is a lot of information, it required an awful lot of cleaning to Gettingrid of empty data cells.

                 </Paragraph>

            <Paragraph>
                The visualization itself consists of years on the x-axis and percentage of households headed by single people.  On hover, you can see the gdp of the given year.
                Limited by what I hoped to see, the datasets weren't complete for very robust comparisons, i.e., what did, say Ireland, change as its GDP expoloded in the 90s.
                 </Paragraph>
            {countries.length > 0 ?
                <div>

                    <MultiSelect
                        onChange={handleSelectionChange}
                        options={countryList}
                        textProp="name"
                        valueProp="value"
                    />

                    <ChipBox>
                        {selectedCountryList.map((d, i) =>

                            <Chip
                                variant="outlined"
                                size="small"
                                icon={<CancelIcon />}
                                label={d}
                                onClick={removeCountry}
                                id={d} />
                        )}
                    </ChipBox>
                    <Tooltip title="fetch data">
                        <SearchIcon onClick={fetchData} />
                    </Tooltip>

                    <HouseHoldBubble data={chartData} />
                </div>
                :
                <p>
                    Fetching Country List...
            </p>

            }
        </div >
    )
}
