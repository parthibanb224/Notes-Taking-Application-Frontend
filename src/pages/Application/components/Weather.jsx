import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { useUser } from '../../../context/Users.context';

export default function Weather() {

    const [weatherData, setWeatherData] = useState({});
    // const [city, setCity] = useState('Theni');
    // const apiKey = 'c6e2d53a9518aac69e2a7430c76efd67';
    const { signinUser } = useUser();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationOff, setLocationOff] = useState(false);

    useEffect(() => {
        // Check if geolocation is available in the user's browser
        if ('geolocation' in navigator) {
            // Get the user's current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLongitude(longitude);
                    setLatitude(latitude);
                },
                (error) => {
                    setLocationOff(true);
                    // console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not available in your browser.');
        }
    }, [signinUser]);

    // Map weather conditions to appropriate icons
    const getWeatherIcon = (icon) => {
        switch (icon) {
            case '01d':
                return <WiDaySunny />;
            case '02d':
                return <WiCloudy />;
            case '03d':
                return <WiCloudy />;
            case '04d':
                return <WiCloudy />;
            case '09d':
                return <WiRain />;
            case '10d':
                return <WiRain />;
            case '11d':
                return <WiThunderstorm />;
            case '13d':
                return <WiSnow />;
            default:
                return <WiDaySunny />;
        }
    };

    useEffect(() => {
        axios
            .get(
                // `https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=c6e2d53a9518aac69e2a7430c76efd67`
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude || 13.0827}&lon=${longitude || 80.2707}&appid=4e97ce2e43bfedfc953dce3a319a7912`
            )
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                // console.error('Error fetching weather data:', error);
            });
    }, [latitude, longitude]);

    return (
        <div>
            <div className="weather-card">
                {weatherData.main && (
                    <>
                        <div className="weather-icon">{getWeatherIcon(weatherData.weather[0].icon)}</div>
                        <div className="weather-details">
                            <div>
                                {locationOff ? <p className='text-rose-700 font-thin'>If You Want Exact Temperature Switch ON the Location(Default Temperature is chennai Location) </p> : ""}
                                <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                                <p>Humidity: {weatherData.main.humidity}%</p>
                                <p>Weather: {weatherData.weather[0].description}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
