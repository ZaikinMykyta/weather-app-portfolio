import WeatherService from "./WheatherService";
import { useState } from "react";

const Requests = () => {

    const {getCity, getCurrentWheather, getWeeklyWheather} = WeatherService();

    const [city, setCity] = useState({});
    const [bannerCity, setBannerCity] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [weatherSwitch, setWeatherSwitch] = useState(0);
    const [err, setErr] = useState(false);
    const [days, setDays] = useState(0);


    const onWeatherSwitch = (bool) => {
        setWeatherSwitch(bool);
    }
    const onBannerCitySelected = (selectedCity) => {
        setBannerCity(selectedCity);
        setShowCard(false);
    }

    const onCitySelected = (selectedCity) => {
        onBannerCitySelected(selectedCity);
    }

    const onWeatherLoaded = (weatherData) => {
        setCity(weatherData);
        setBannerCity({});
        setDays(0);
        setErr(false);
        setShowSpinner(false);
        setShowCard(true);
    }

    const onShowSpinner = (bool) => {
        setShowSpinner(bool);
    }

    const onCardShow = (bool) => {
        setShowCard(bool);
    }

    const onRequestByName = (city, days=2) => {
        if(city.length <= 1) {
            return
        } else {
            if(weatherSwitch === 0) {
                getCity(city, 1)
                    .then((data) => {
                        if (!data?.[0]) {
                            throw new Error('City not found');
                        }
                        return getCurrentWheather(data[0].lat, data[0].lon);
                    })
                    .then((data) => {
                        onWeatherLoaded(data);
                    })
                    .catch(() => {
                        setErr(true);
                        onShowSpinner(false);
                        onCardShow(false);
                    })
            } else {
                getCity(city, 1)
                    .then((data) => {
                        if (!data?.[0]) {
                            throw new Error('City not found');
                        }
                        return getWeeklyWheather(data[0].lat, data[0].lon, days);
                    })
                    .then((data) => {
                        onWeatherLoaded(data);
                    })
                    .catch(() => {
                        setErr(true);
                        onShowSpinner(false);
                        onCardShow(false);
                    })
            }
        }
    }
    
    const onRequestByCoords = (lat, lon, day=0) => {
        if(day < 2) {
            getCurrentWheather(lat, lon)
                .then(data => {
                    onWeatherLoaded(data);
                })
                .catch(() => {
                    setErr(true);
                    onShowSpinner(false);
                    onCardShow(false);
                })
        } else if(day > 1){
            getWeeklyWheather(lat, lon, day)
                .then((data) => {
                    onWeatherLoaded(data);
                })
                .catch(() => {
                    setErr(true);
                    onShowSpinner(false);
                    onCardShow(false);
                })
        }
    }

    return {onRequestByName, err, weatherSwitch, days, setDays, setWeatherSwitch, onWeatherSwitch, onCitySelected, onBannerCitySelected, showCard, city, bannerCity, setBannerCity, onCardShow, onShowSpinner, setCity, showSpinner, onRequestByCoords};
}

export default Requests;