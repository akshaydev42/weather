 import React from 'react'

const Forecast = ({weather}) => {
  const d = weather.list;
  const dayIs = (dt)=>{
        let day  = new Date(dt*1000).toDateString().slice(0,4);
        return day;
  }
  return (
    <>
<div className="forecast-container">
{d.map((da, index) => (
            <div className="forecast-day" key={index}>
              <span>{dayIs(da.dt)}</span>
              <img src={` https://openweathermap.org/img/wn/${da.weather[0].icon}@2x.png`} alt="Cloudy" />
              <span>{`${da.main.temp.toFixed()}°C`}</span>
             </div>
)       
)}
</div>
</>
  )
}

export default Forecast
