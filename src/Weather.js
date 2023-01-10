import React from "react"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import Current from "./Current"
//import parse from 'html-react-parser';

export default function Weather(){
    let [city,setCity] = useState("oslo")
    let [info, setInfo] = useState({ready:false});
    //let [forecastElment, setforecastElment] = useState(null)

    function handleResponse(response){
        setInfo({
            ready: true,
            city : response.data.city ,
            currentTemp : Math.round(response.data.temperature.current),
            windSpeed : response.data.wind.speed ,
            humidity : response.data.temperature.humidity,
            weatherDesc : response.data.condition.description,
            imgSrc :`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`

        })

    }
    
    function callApi(){
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=7386080a2f6318d17ebb9t1f5453o70f`;
        let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=7386080a2f6318d17ebb9t1f5453o70f`
        axios.get(apiUrl).then(handleResponse);
        //axios.get(forecastApiUrl).then(handleForecastResponse);
    }
    function handleCityInput(event){
        setCity(event.target.value)
    }
    function handleSubmit(event){
        event.preventDefault()
        callApi()
    }
    if (info.ready){
        return (
            <div>
            <div className="search-box">
                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                  <input
                    className="form-control me-2 city-input"
                    type="search"
                    placeholder="Search for a city"
                    aria-label="Search"
                    onChange={handleCityInput}
                  />
                  <button
                    className="btn btn-outline-danger btn-light search-button"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
            </div>
            <div className="weather-now mt-1">
                <Current input={info} />
                 {/* {getChildComp} */}
                 <div className="mt-3 text-center" > 
                 {/* {forecastElment} */}
                 </div>    
            </div>
            </div>
          );

    } else {
        callApi()
    }
}