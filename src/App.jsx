import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import WeatherService from "./services/WheatherService";

import AppHeader from "./components/AppHeader/AppHeader";
import SearchBanner from './components/SearchBanner/SearchBanner'
import WheatherCurrentCard from "./components/WheatherCards/WheatherCurrentCard";
import WeatherWeeklyCards from './components/WheatherCards/WheatherWeeklyCards';
import Spinner from "./components/Spinner/Spinner";

function App() {

    const [city, setCity] = useState({});
    const [showCard, setShowCard] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [weatherSwitch, setWeatherSwitch] = useState(0);

    const {getCity, getCurrentWheather, getWeeklyWheather} = WeatherService();

    const onCitySelected = (city) => {
        setCity(city);
    }

    const onWeatherSwitch = (switchValue) => {
        setWeatherSwitch(switchValue);
    }

    const onCardShow = (bool) => {
        setShowCard(bool);
    }

    const onShowSpinner = (bool) => {
        setShowSpinner(bool);
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
                                onCitySelected(data);
                                onShowSpinner(false);
                                onCardShow(true);
                            })
                    })
            } else {
                getCity(city, 1)
                    .then((data) => {
                        getWeeklyWheather(data[0].lat, data[0].lon, days)
                            .then((data) => {
                                onCitySelected(data);
                                onShowSpinner(false);
                                onCardShow(true);
                            })
                    })
            }
        }
    }

    const onRequestByCoords = (lat, lon) => {
        getCurrentWheather(lat, lon)
                    .then(data => {
                        onCitySelected(data);
                        onShowSpinner(false);
                        onCardShow(true);
                    })
    }

    
    const currentCard = showCard && !showSpinner ? <WheatherCurrentCard city={city}/> : null
    const weeklyCard = showCard && !showSpinner ? <WeatherWeeklyCards city={city}/> : null
    const spinner = showSpinner ? <Spinner/> : null

    return (
        <Router>
            <AppHeader city={city} 
                        showCard={showCard} 
                        onCardShow={onCardShow} 
                        weatherSwitch={weatherSwitch} 
                        onWeatherSwitch={onWeatherSwitch} 
                        onRequest={onRequestByName}
                        setCity={setCity}/>
            <main className="flex flex-col items-center w-full min-h-screen px-2 sm:px-4 box-border">
                <SearchBanner onShowSpinner={onShowSpinner} 
                                onCitySelected={onCitySelected} 
                                city={city} 
                                onRequest={onRequestByCoords}
                                onRequestByName={onRequestByName}
                                onCardShow={onCardShow}
                                weatherSwitch={weatherSwitch}/>
                {weatherSwitch ? weeklyCard : currentCard}
                {spinner}
            </main>
        </Router>
    )
}

export default App
