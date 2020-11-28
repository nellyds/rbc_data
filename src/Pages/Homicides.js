import React, { useContext, useState } from 'react'
import { PageHeader, Paragraph, MultiSelectBox } from "../Styles/StyledComponents"
import { Tabs, Tab, Panel } from '@bumaga/tabs'
import SearchIcon from '@material-ui/icons/Search';
import CommentIcon from '@material-ui/icons/Comment';
import Tooltip from '@material-ui/core/Tooltip';
import HomicideChart from "../Components/Homicides/HomicideChart"
import FilterSelect from "../Components/Forms/FilterSelect"
import { HomicideContext } from "../Contexts/HomicideContext"

import BarChartIcon from '@material-ui/icons/BarChart';
export default function Homicides() {

    const { countries, compileChartData, gdpData, homicideData } = useContext(HomicideContext)
    const [countryList, setCountryList] = useState([])

    const addToCountryList = (event) => {
        setCountryList([...countryList, event.target.id])
    }

    const removeCountryFromList = (event) => {
        let arr = countryList.filter((d) => d !== event.target.id)
        if (countryList.length === 1) {
            setCountryList([])
        }
        setCountryList([...arr])
    }

    const compile = () => {
        console.log('reached')
        if (countryList.length > 0) {
            compileChartData(countryList)
        }
    }

    return (
        <div>
            <PageHeader>Global Homicide Trends</PageHeader>
            <Tabs>
                <MultiSelectBox>
                    <div class="tabHead">
                        <Tab><CommentIcon /></Tab>
                    </div>
                    <div class="tabHead">
                        <Tab><SearchIcon /></Tab>
                    </div>
                    <div onClick={compile} class="tabHead">
                        <Tab><BarChartIcon /></Tab>
                    </div>
                </MultiSelectBox>

                <Panel><Paragraph>The formatting of WorldInData csvs made this easy enough to start working with.  Trying to get a better UI experience more than anything else.  </Paragraph></Panel>
                <Panel>
                    <MultiSelectBox>
                        <FilterSelect fields={countries} addToList={addToCountryList} />
                        <div>
                            {countryList.map((d) => <p id={d} onClick={removeCountryFromList}> Select: {d} </p>)}
                        </div>
                    </MultiSelectBox>
                </Panel>
                <Panel><HomicideChart gdp={gdpData} homicide={homicideData} /></Panel>
            </Tabs>
        </div>
    )
}
