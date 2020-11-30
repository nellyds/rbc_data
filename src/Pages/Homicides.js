
import React, { useContext, useState } from 'react'
import { PageHeader, Paragraph, MultiSelectBox, CenterDiv} from "../Styles/StyledComponents"
import CoolTabs from 'react-cool-tabs';
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
            <Paragraph>The formatting of WorldInData csvs made this easy enough to start working with.  Trying to get a better UI experience more than anything else.  </Paragraph>
            <center>
            <CoolTabs
                tabKey={'1'}
                style={{ width: 400, height: 800, background: 'white' }}
                activeTabStyle={{ background: 'black', color: 'white' }}
                unActiveTabStyle={{ background: 'white', color: 'black' }}
                activeLeftTabBorderBottomStyle={{ background: 'black', height: 4 }}
                activeRightTabBorderBottomStyle={{ background: 'black', height: 4 }}
                tabsBorderBottomStyle={{ background: 'white', height: 4 }}
                leftTabTitle={<SearchIcon />}
                rightTabTitle={<BarChartIcon />}
                leftContent={
                    <div>
                    <MultiSelectBox>
                        <FilterSelect fields={countries} addToList={addToCountryList} />
                        <div>
                            {countryList.map((d) => <p id={d} onClick={removeCountryFromList}> {d} : X </p>)}
                        </div>
                    </MultiSelectBox>
                    <p onClick={compile}>Compile Chart</p>
                    </div>
                }
                rightContent={
                    <HomicideChart gdp={gdpData} homicide={homicideData} />
                }
                contentTransitionStyle={'transform 0.6s ease-in'}
                borderTransitionStyle={'all 0.6s ease-in'} />
                </center>
        </div>
    )
}
