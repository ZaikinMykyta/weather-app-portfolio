import WeatherService from "./WheatherService";
import { useState } from "react";

const Requests = () => {

    const {getCity, getCurrentWheather, getWeeklyWheather} = WeatherService();

    const [city, setCity] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [weatherSwitch, setWeatherSwitch] = useState(0);
    const [err, setErr] = useState(false);
    const [days, setDays] = useState(0);


    const onWeatherSwitch = (bool) => {
        setWeatherSwitch(bool);
    }
    const onCitySelected = (city) => {
        setCity(city);
        setShowCard(false);
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
                        console.log(data);
                        getCurrentWheather(data[0].lat, data[0].lon)
                            .then((data) => {
                                setErr(false);
                                onCitySelected(data);
                                onShowSpinner(false);
                                onCardShow(true);
                            })
                    })
                    .catch((err) => {
                        setErr(true);
                        throw new Error('There has been some problem', {cause: err});
                    })
            } else {
                getCity(city, 1)
                    .then((data) => {
                        getWeeklyWheather(data[0].lat, data[0].lon, days)
                            .then((data) => {
                                setErr(false);
                                onCitySelected(data);
                                onShowSpinner(false);
                                onCardShow(true);
                            })
                    })
                    .catch((err) => {
                        setErr(true);
                        throw new Error('There has been some problem', {cause: err});
                    })
            }
        }
    }
    
    const onRequestByCoords = (lat, lon, day=0) => {
        if(day < 2) {
            getCurrentWheather(lat, lon)
                .then(data => {
                    setErr(false);
                    onCitySelected(data);
                    onShowSpinner(false);
                    onCardShow(true);
                })
                .catch((err) => {
                    setErr(true);
                    throw new Error('There has been some problem', {cause: err});
                })
        } else if(day > 1){
            getWeeklyWheather(lat, lon, day)
                .then((data) => {
                    setErr(false);
                    onCitySelected(data);
                    onShowSpinner(false);
                    onCardShow(true);
                })
                .catch((err) => {
                    setErr(true);
                    throw new Error('There has been some problem', {cause: err});
                })
        }
    }

    return {onRequestByName, err, weatherSwitch, days, setDays, setWeatherSwitch, onWeatherSwitch, onCitySelected, showCard, city, onCardShow, onShowSpinner, setCity, showSpinner, onRequestByCoords};
}

export default Requests;