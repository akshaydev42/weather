import React, { useState, useEffect } from 'react'
import './Weather.css';
import { FaSearch,FaWind } from "react-icons/fa";
import {MdLocationOn} from 'react-icons/md';
import {WiHumidity} from 'react-icons/wi'; 
import Forecast from './Forecast.js'

const Weather = () => {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState();
    const [error, setError] = useState(''); 
    const [temp, setTemp] = useState(0);
    const [bgColor, setBgColor] = useState('');

    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    function handleOnChange(event) {
        setCity(event.target.value);
    }

    async function fetchData() {
        try {
          
            const weekres = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
            const week = await weekres.json();
            let response = await fetch(url);
            let output = await response.json();
            week.list = week.list.filter((d)=>(d.dt_txt.slice(-8)==="00:00:00"));
            const outPut = {output, week}
                setWeather(outPut);
                setTemp(output.main.temp);
              
                setError(false);
            }
        catch (error) {
            setError('No data found. Please enter a valid city name.')
            setWeather(false);
        }
    }
  const  getBgTemperature = (t)=>{
   if(t>=32) return 'hot'
   else if(t<24) return 'cool'
   else if(t>=24 && t<32) return 'mild'
   return
  }
    useEffect(()=>{
       setBgColor(getBgTemperature(temp));
    }, [temp])
  return (
    <div className= {`container ${bgColor}`}>
        <div className='city'>
            <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name'></input>
            <button onClick={() => fetchData()}>
                <FaSearch></FaSearch>
            </button>
        </div>

        {
            error && <p className='error-message'>{error}</p>
        }
        {
            weather &&
            <div className='content ' >

              <div className='weather-city'>
                    <div className='location'>
                        <MdLocationOn></MdLocationOn>
                    </div>
                    <p>{weather.output.name},<span>{weather.output.sys.country}</span></p>
                </div>
                <div className= "weather-info">
                    
                <div className='weather-image'>
                    <h3 className='desc'>{weather.output.weather[0].description}</h3>
                </div>

                <div className='weather-temp'>
                    <h2>{weather.output.main.temp}<span>&deg;C</span></h2>
                </div>


                <div className='weather-stats'>
                    <div className='wind'>
                        <div className='wind-icon'>
                            <FaWind></FaWind>
                        </div>
                        <h3 className='wind-speed'>{weather.output.wind.speed}<span>Km/h</span></h3>
                        <h3 className='wind-heading'>Wind Speed</h3>
                    </div>    
                    <div className='humidity'>
                        <div className='humidity-icon'>
                            <WiHumidity></WiHumidity>
                        </div>
                        <h3 className='humidity-percent'>{weather.output.main.humidity}<span>%</span></h3>
                        <h3 className='humidity-heading'>Humidity</h3>
                    </div>
                </div>
                    </div>
                 <Forecast weather={weather.week}/>
            </div>
        }
    </div>
  )
}

export default Weather
