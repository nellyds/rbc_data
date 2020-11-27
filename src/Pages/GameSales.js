import React, { useContext, useState } from 'react'
import { GameDataContext } from "../Contexts/GameContext"
import PublisherTreeMap from "../Components/GameSales/PublisherTreeMap"
import FieldSelect from "../Components/Forms/FieldSelect"
import TitlesChart from "../Components/GameSales/TitlesChart"
import ChartBuilder from "../Components/GameSales/ChartBuilder"
import { PageHeader, Paragraph } from "../Styles/StyledComponents"
function GameSales() {

    const { topPublishers, dataReady, topTwenty } = useContext(GameDataContext)
    const [publishers, setPublishers] = useState([])
    const [range, setRange] = useState(1)
    const [salesRange, setSalesRange] = useState(1)
    const [showSales, toggleSales] = useState(false)
    const buildChart = async () => {

        await setPublishers(topPublishers.slice(0, range))
    }

    const toggleChart = () => {
        toggleSales(!showSales)
    }

    return (
        <div>
<PageHeader >Top Game publishers</PageHeader>
<Paragraph>The pattern for working with CSV are getting a bit more obvious, but I wanted to try out Apex Charts instead of React-vis.  Conclusion, syntax is bit too unwieldy even if it does a surprising amount of boilerplate configuration for you.  </Paragraph>

            { dataReady && topPublishers.length > 40 ?
                <div>
                    <p onClick={buildChart}>Build Chart</p>
                    {!showSales ?
                        <p onClick={toggleChart}>Out of the top 1000 selling games of all time, one publisher appears just a bit more than its peers.
                                                        But how many units of software does that amount to? </p>
                        :
                        <p onClick={toggleChart}> Total Units sold by publisher</p>
                    }

                    <p>{range}</p>
                    <FieldSelect fields={[5, 20, 50, 100]} setField={setRange} />
                    <PublisherTreeMap toggle={showSales} data={publishers} />
                    <TitlesChart data={topTwenty} />
                    {/* <ChartBuilder /> */}
                </div>
                : <div>
                    <p>Data not ready</p>
                </div>
            }
        </div>
    )
}
export default GameSales