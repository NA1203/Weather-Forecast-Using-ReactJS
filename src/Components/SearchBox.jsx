import React from 'react';
import { TextField } from "@mui/material";
import './SearchBox.css';
import { useState } from "react";
import search_img from '../assets/search.jpeg';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    //open weather api
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "284ceb8e3cfedc0b5595ba8efaa6c4b5";

    const getWeatherInfo = async () => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            let jsonResponse = await response.json();
            //console.log(jsonResponse);
            let result = {
                city: jsonResponse.name,
                countrycode: jsonResponse.sys.country,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather_desc: jsonResponse.weather[0].description,
                icon: jsonResponse.weather[0].icon,
                pressure: jsonResponse.main.pressure,
                visibility: jsonResponse.visibility,
                windSpeed: jsonResponse.wind.speed,
                timestamp: jsonResponse.dt,
            };
            console.log(result);
            return result;

        } catch (error) {
            alert("No such place exists! Enter correct city name.");
            return;
        }
    }

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit} className='form-container'>
                <TextField 
                    id="city" 
                    label="Search City" 
                    variant="filled" 
                    required 
                    value={city}
                    onChange={handleChange}
                    className='inputBox'
                    color='secondary'
                />
                <br /><br />
                <button variant="contained" type='submit'><img src={search_img} alt="search_icon" /></button>
            </form>
        </div>
    );
}
