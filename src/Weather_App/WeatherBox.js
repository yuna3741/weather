import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header';

function WeatherBox({ data, isError, isLoading, setCity, refetch, DarkMode }) {

  const icons = {
    'clear sky': DarkMode ? '/img/main2_sun_type2.jpg' : '/img/main_sun_type2.jpg',
    'few clouds': DarkMode ? '/img/main2_sun_type2.jpg' : '/img/main_sun_type2.jpg',
    'scattered clouds': DarkMode ? '/img/main2_sun_type2.jpg' : '/img/main_sun_type2.jpg',
    'broken clouds': DarkMode ? '/img/main2_cloud_type2.jpg' : '/img/main_cloud_type2.jpg',
    'overcast clouds': DarkMode ? '/img/main2_cloud_type2.jpg' : '/img/main_cloud_type2.jpg',
    'light rain': DarkMode ? '/img/main2_rain.jpg' : '/img/main_rain.jpg',
    'moderate rain': DarkMode ? '/img/main2_rain.jpg' : '/img/main_rain.jpg',
    'heavy rain': DarkMode ? '/img/main2_rain.jpg' : '/img/main_rain.jpg',
    'very heavy rain': DarkMode ? '/img/main2_rain.jpg' : '/img/main_rain.jpg',
    'extreme rain': DarkMode ? '/img/main2_rain.jpg' : '/img/main_rain.jpg',
    'freezing rain': DarkMode ? '/img/main2_rain.jpg' : '/img/main_rain.jpg',
    'light shower rain': DarkMode ? '/img/main2_rain.jpg' : '/img/main_rain.jpg',
    'light snow': DarkMode ? '/img/main2_snow.jpg' : '/img/main_snow.jpg',
    'moderate snow': DarkMode ? '/img/main2_snow.jpg' : '/img/main_snow.jpg',
    'heavy snow': DarkMode ? '/img/main2_snow.jpg' : '/img/main_snow.jpg',
    'sleet': DarkMode ? '/img/main2_snow.jpg' : '/img/main_snow.jpg',
    'light shower snow': DarkMode ? '/img/main2_snow.jpg' : '/img/main_snow.jpg',
    'heavy shower snow': DarkMode ? '/img/main2_snow.jpg' : '/img/main_snow.jpg',
    'mist': DarkMode ? '/img/main2_fog.jpg' : '/img/main_fog.jpg',
    'smoke': DarkMode ? '/img/main2_fog.jpg' : '/img/main_fog.jpg',
    'haze': DarkMode ? '/img/main2_fog.jpg' : '/img/main_fog.jpg',
    'fog': DarkMode ? '/img/main2_fog.jpg' : '/img/main_fog.jpg',
    'dust': DarkMode ? '/img/main2_fog.jpg' : '/img/main_fog.jpg',
    'ash': DarkMode ? '/img/main2_fog.jpg' : '/img/main_fog.jpg',
    'sand': DarkMode ? '/img/main2_wind.jpg' : '/img/main_wind.jpg',
    'squall': DarkMode ? '/img/main2_wind.jpg' : '/img/main_wind.jpg',
    'tornado': DarkMode ? '/img/main2_wind.jpg' : '/img/main_wind.jpg',


  }

  const description = data?.weather[0].description;
  const iconSelect = icons[description] || '/img/main_sun_type2.jpg';

  if (isLoading) {
    return <h2 className="loading">Loading...<span>(. ❛ ᴗ ❛.)</span></h2>
  };

  if (isError) {
    return (
      <div className="error">
        <h2>Oops! Error<span>...(っ °Д °;)っ</span> </h2>
        <h2>Please enter the exact name of the city</h2>
        <button onClick={() => { setCity(""); refetch() }}>Retry</button>
      </div>)

  };


  return (

    <div className={`box box2 ${DarkMode ? "dark" : ""}`}>
      <div className={`b_inner ${DarkMode ? "dark" : ""}`}>
        <figure>
          <img src={`${iconSelect}`} alt={description} />
          <h3 className={DarkMode ? "dark" : ""}>{description}</h3>
        </figure>
        <div className="text">
          <div className="line">
            <h2>name:<span>{data?.name}</span></h2>
          </div>
          <div className="line line2">
            <h3>temp:<span className="s_1">{(data?.main.temp - 273.15).toFixed(1)}˚c</span></h3>
          </div>
          <div className="t_i">
            <p><span>humidity</span><span className="s_2">{data?.main.humidity}%</span></p>
            <p><span>wind speed</span><span className="s_2">{data?.wind.speed}m/s</span></p>
          </div>
        </div>

      </div>


    </div>


  )
}

export default WeatherBox