import React, {useState, useEffect} from 'react'
import { readRemoteFile } from 'react-papaparse';
import KwhTreemap from "../Components/KWH/kwhTreemap"
import { Swiper, SwiperSlide } from 'swiper/react';
import '../Styles/app.css'
import 'swiper/swiper.scss';
export default function Kwh() {

    const [kwhData, setKwhData] = useState([])
    const [fetching, setFetching] = useState(true)
    const [step, setStep] = useState(0)
    const [scrWidth, setScrWidth] = useState(320)
    function handleResize() {
        setScrWidth(Math.floor(window.innerWidth * .8))

    }

    useEffect(()=>{     readRemoteFile(
        'https://raw.githubusercontent.com/nellyds/dataSets/master/kwhClean.csv', {
        complete: (result) =>{
            setKwhData(result)
            setFetching(false)
        }
    })
    window.addEventListener('resize', handleResize)
    setScrWidth(window.innerWidth > 300 ? 320 : Math.floor(window.innerWidth * .9))
}, [])

    const handleStep = () =>{
        setStep(step+1)
    }
    const years = ['1990', '1995','2000', '2005', '2010', '2015']
    return (
        <div>
            <p>kwh</p>
            {fetching ? 
            <p>fetching</p>
            :
            <div>
            <p onClick={handleStep}>done</p>
                <KwhTreemap   scrWidth={scrWidth} data={kwhData} year={step}/>
                <Swiper
      spaceBetween={50}
      slidesPerView={1}
    onSlideChange={(a) => setStep(a.activeIndex)}
   
    >

        {years.map((d, index) =>
        <SwiperSlide virtualIndex ={index}>
    {({ isActive }) => (
       
      <div>Current slide is {isActive ?  d : null}</div>
    )}
        <p>{d}</p>
        </SwiperSlide>
        )}
    </Swiper>
                </div>
            }
        </div>
    )
}
