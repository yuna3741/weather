import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import WeatherBox from './WeatherBox'
import "./Weather.css"
import Hours from './Hours';
import Header from './Header';

function Weather() {

  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [city, setCity] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [DarkMode, setDarkMode] = useState(() => {
    const saveTheme = localStorage.getItem('theme');
    return saveTheme ? saveTheme === 'dark' : false

  });

  const getCurrentLoation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }

  const fetchLocation = () => {

    if (city) {
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e02e017e6908016a036655c3b23c14d`);


    } else {
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0e02e017e6908016a036655c3b23c14d`);
    }

  }


  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['weather', lat, lon, city],
    queryFn: () => fetchLocation(lat, lon),
    enabled: !!lat && !!lon,
    retry: 1,
    select: (data) => { return data.data },
    gcTime: 30000,
    staleTime: 15000
  });

  useEffect(() => {
    getCurrentLoation();
  }, [lat, lon, city]);


  const isDarkMode = (DarkMode) => {
    const elements = document.querySelectorAll(
      'body,.box,.box2,.b_inner,.title h1,.box2 .b_inner figure h3,.h_box,.loading,.error h2,input,button'
    )


    elements.forEach((e) => {
      if (DarkMode) {
        e.classList.add('dark');
      } else {
        e.classList.remove('dark');
      }
    })
  }



  const toggle = () => {
    const newDarkMode = !DarkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    isDarkMode(newDarkMode);
  }





  useEffect(() => {

    isDarkMode(DarkMode)
  }, []);



  const enter = (e) => {
    if (e.key === 'Enter' && cityInput.trim() !== "") {

      setCity(cityInput);
      setCityInput("");
    }

  };

  const handClick = () => {
    if (cityInput.trim() !== "") {
      setCity(cityInput);
      setCityInput("");
    }
  }


  return (
    <div className="wrap">
      <div className="contents">
        <Header cityInput={cityInput} setCityInput={setCityInput} enter={enter} handClick={handClick} toggle={toggle} DarkMode={DarkMode} />
        <WeatherBox data={data} isLoading={isLoading} isError={isError} refetch={refetch} setCity={setCity} DarkMode={DarkMode} />
      </div>
      <Hours lat={lat} lon={lon} city={city} DarkMode={DarkMode} />

    </div>
  )
}

export default Weather
