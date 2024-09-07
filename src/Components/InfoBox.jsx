import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined'; // Air icon for wind speed
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined'; // Wave icon for humidity
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from'@mui/icons-material/Thunderstorm';
import './InfoBox.css';

import search_icon from '../assets/search.jpeg';
import clearNight from '../assets/photo/clear_night.jpeg';
import clear_Sunny from '../assets/photo/sunny.jpeg';
import few_c_d from '../assets/photo/fc_day.jpg';
import few_c_n from '../assets/photo/fc_night.jpg';
import cloudy from '../assets/photo/cloudy.jpg';
import shower_rain from '../assets/photo/shower_rain.jpeg';
import rain from '../assets/photo/rain.jpeg';
import Storm from '../assets/photo/storm.jpg';
import snow from '../assets/photo/snow.jpeg';
import mist_d from '../assets/photo/mist_d.jpg';
import mist_n from '../assets/photo/mist_n.png';
import broken_c_day from '../assets/photo/broken_c_d.jpeg';
import broken_c_night from '../assets/photo/broken_c_n.jpg';

export default function InfoBox({ info }) {
    const allIcons = {
        "01d": clear_Sunny,
        "01n": clearNight,
        "02d": few_c_d,
        "02n": few_c_n,
        "03d": cloudy,
        "03n": cloudy,
        "04d": broken_c_day,
        "04n": broken_c_night,
        "09d": shower_rain,
        "09n": shower_rain,
        "10d": rain,
        "10n": rain,
        "11d": Storm,
        "11n": Storm,
        "13d": snow,
        "13n": snow,
        "50d": mist_d,
        "50n": mist_n
    };
    const img_icon = allIcons[info.icon];

    // Code to get Country Name
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    let countryName = regionNames.of(info.countrycode);
    let visib = parseFloat(info.visibility)/1000; 

    // Function to format date and time
    const formatDateTime = (timestamp) => {
        if (!timestamp) return "No date and time available";
        
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric' };

        const formattedDate = date.toLocaleDateString('en-US', optionsDate);
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

        return `${formattedDate} ${formattedTime}`;
    };


    return(
    <div className='InfoBox'>
        <br />
        <div className='cardContainer'>
            <Grid container spacing={2} className='grid-container'>
                <Grid item xs={8} md={3.5}>
                    <Card>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={img_icon}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: 'serif' }}>
                                {info.city}, {countryName}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'serif' }}>
                                {formatDateTime(info.timestamp)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={8} md={3.5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Typography variant="h5" gutterBottom>
                                                {info.temp}&deg;C
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            {info.humidity > 50 ? <ThunderstormIcon fontSize='large' /> : (info.temp > 15) ? <WbSunnyIcon fontSize='large' /> : <AcUnitIcon fontSize='large' />}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <AirOutlinedIcon fontSize="large" />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" color="text.secondary">
                                                Wind Speed: {info.windSpeed} m/s
                                            </Typography>
                                        </Grid>
                                        <br />
                                        <Grid item>
                                            <BeachAccessOutlinedIcon fontSize="large" />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" color="text.secondary">
                                                Humidity: {info.humidity}%
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <i> Min Temperature: {info.tempMin}&deg;C
                                            <br />
                                            Max Temperature: {info.tempMax}&deg;C
                                            <br />
                                            Pressure: {info.pressure} hPa
                                            <br />
                                            Visibility = {visib} km
                                            <br />
                                            The weather can be described as <b>{info.weather_desc}</b> and feels like {info.feelsLike}&deg;C.
                                            </i>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </div>)
}