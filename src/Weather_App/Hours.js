import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function Hours({ lat, lon, city, DarkMode }) {

  const GetHours = () => {
    if (city) {
      return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0e02e017e6908016a036655c3b23c14d`)
    } else {
      return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0e02e017e6908016a036655c3b23c14d`)
    }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Hours', lat, lon, city],
    queryFn: () => GetHours(lat, lon),
    enabled: !!lat && !!lon,
    retry: 1,
    select: (data) => { return data.data },
    gcTime: 30000,
    staleTime: 15000
  });

  console.log(data)

  if (isLoading) {
    return <h2 className="loading"></h2>
  }
  if (isError) {
    return <h2 className="error"></h2>
  }

  return (
    <div className="all_hours">
      <div className="h_contents">
        <div className={`h_box ${DarkMode ? "dark" : ""}`}>
          <h2>{data?.list[1].dt_txt.substring(11, 16)}</h2>
          <h2>{(data?.list[1].main.temp - 273.15).toFixed(1)}˚C</h2>
          <p>{data?.list[1].weather[0].description}</p>

        </div>

        <div className={`h_box ${DarkMode ? "dark" : ""}`}>
          <h2>{data?.list[2].dt_txt.substring(11, 16)}</h2>
          <h2>{(data?.list[2].main.temp - 273.15).toFixed(1)}˚C</h2>
          <p>{data?.list[2].weather[0].description}</p>

        </div>

        <div className={`h_box ${DarkMode ? "dark" : ""}`}>
          <h2>{data?.list[3].dt_txt.substring(11, 16)}</h2>
          <h2>{(data?.list[3].main.temp - 273.15).toFixed(1)}˚C</h2>
          <p>{data?.list[3].weather[0].description}</p>

        </div>

        <div className={`h_box ${DarkMode ? "dark" : ""}`}>
          <h2>{data?.list[4].dt_txt.substring(11, 16)}</h2>
          <h2>{(data?.list[4].main.temp - 273.15).toFixed(1)}˚C</h2>
          <p>{data?.list[4].weather[0].description}</p>

        </div>
      </div>

    </div>
  )
}

export default Hours
