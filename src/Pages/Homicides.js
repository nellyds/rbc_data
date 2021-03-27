
import React, { useContext, useState } from 'react'
import { PageHeader, Paragraph, MultiSelectBox, ChipBox } from "../Styles/StyledComponents"
import CoolTabs from 'react-cool-tabs';
import SearchIcon from '@material-ui/icons/Search';
import CommentIcon from '@material-ui/icons/Comment';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import HomicideChart from "../Components/Homicides/HomicideChart"
import FilterSelect from "../Components/Forms/FilterSelect"
import { HomicideContext } from "../Contexts/HomicideContext"
export default function Homicides() {

    const { countries, compileChartData, gdpData, homicideData } = useContext(HomicideContext)
    const [countryList, setCountryList] = useState(['Chile', 'Ireland'])
    const [dataReady, setReady] = useState(false)
    const addToCountryList = (event) => {
        setCountryList([...countryList, event.target.id])
    }

    const removeCountry = (event) => {
        console.log(event)
        let arr = countryList.filter((d) => d !== event.target.innerHTML)
        if (countryList.length === 1) {
            setCountryList([])
        }
        setCountryList([...arr])
    }

    const compile = async () => {
        if (countryList.length > 0) {
            compileChartData(countryList)

        }
    }

    const fetch = async () => {
        compile()
        await setReady(true)
    }
    return (
        <div>
            <PageHeader>Global Homicide Trends</PageHeader>
            <Paragraph>The formatting of WorldInData csvs made this easy enough to start working with.  Trying to get a better UI experience more than anything else.  </Paragraph>

            <center>

                <div>
                    <MultiSelectBox>
                        <FilterSelect fields={countries} addToList={addToCountryList} />
                        <div>
                            <ChipBox>
                                {countryList.map((d, i) =>

                                    <Chip
                                        variant="outlined"
                                        size="small"
                                        icon={<CancelIcon />}
                                        label={d}
                                        onClick={removeCountry}
                                        id={d} />
                                )}
                            </ChipBox>
                        </div>
                    </MultiSelectBox>
                    <Tooltip title="Fetch Data">
                        <SearchIcon onClick={fetch} />
                    </Tooltip>
                </div>
                <div>
                    <HomicideChart gdp={gdpData} homicide={homicideData} ready={dataReady} />
                </div>
            </center>
        </div>
    )
}
