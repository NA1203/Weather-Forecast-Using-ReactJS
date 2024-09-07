import React, { useState } from 'react';
import SearchBox from './SearchBox.jsx';
import InfoBox from './InfoBox.jsx';
import './WeatherApp.css';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: '',
        temp: 0,
        tempMin: 0,
        tempMax: 0,
        humidity: 0,
        feelsLike: 0,
        weather_desc: '',
        icon: 'default'
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    const getBackgroundClass = (icon) => {
        switch (icon) {
            case '01d':
                return 'background-sunny';
            case '01n':
                return 'background-clear-night';
            case '02d':
                return 'background-fc-day';
            case '02n':
                return 'background-fc-night';
            case '03d':
            case '03n':
                return 'background-cloudy';
            case '04d':
                return 'background-broken-clouds-day';
            case '04n':
                return 'background-broken-clouds-night';
            case '09d':
            case '09n':
                return 'background-shower-rain';
            case '10d':
            case '10n':
                return 'background-rain';
            case '11d':
            case '11n':
                return 'background-storm';
            case '13d':
            case '13n':
                return 'background-snow';
            case '50d':
                return 'background-mist-day';
            case '50n':
                return 'background-mist-night';
            default:
                return 'background-default';
        }
    };

    const backgroundClass = getBackgroundClass(weatherInfo.icon);

    return (
        <div className={`weather ${backgroundClass}`}>
            <br />
            <h1>WEATHER FORECAST WEBSITE</h1>
            <br />
            <div className='parentContainer'>
                <SearchBox updateInfo={updateInfo} />
                {weatherInfo.city ? (
                    <>
                    <InfoBox info={weatherInfo} />
                    </>
                ) : (
                    <p className='text'>Loading...</p>
                )}
            </div>
        </div>
    );
}