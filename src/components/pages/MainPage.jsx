import { useState, useEffect } from "react";

import Requests from "../../services/Requests";

import AppHeader from "../../components/AppHeader/AppHeader";
import SearchBanner from '../../components/SearchBanner/SearchBanner'
import WheatherCurrentCard from "../../components/WheatherCards/WheatherCurrentCard";
import WeatherWeeklyCards from '../../components/WheatherCards/WheatherWeeklyCards';
import Spinner from "../../components/Spinner/Spinner";
import RecentlyUsed from "../../components/RecentlyUsed/RecentlyUsed";
import AppFooter from "../../components/AppFooter/AppFooter";
import ContactMeBanner from "../ContactMeBanner/ContactMeBanner";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.jsx";

const MainPage = () => {
    const [recentlyUsed, setRecentlyUsed] = useState([]);
    const [recentlyUsedObj, setRecentlyUsedObj] = useState({days: '', name: '', type: '', icon: ''});

    useEffect(() => {
        window.localStorage.setItem('recently used', JSON.stringify(recentlyUsed));
    }, [recentlyUsed]);

    const {onRequestByCoords, onCitySelected, weatherSwitch, 
        showCard, city, days, setDays, onCardShow, onShowSpinner, setCity, showSpinner, 
        onRequestByName, onWeatherSwitch} = Requests();

    const onRecentlyUsed = (newItem) => {

        const existingIndex = recentlyUsed.findIndex(
            item => item.name === newItem.name && item.type === newItem.type && item.days === newItem.days
        );

        if (existingIndex !== -1) {
            const updatedList = [...recentlyUsed];
            const [movedItem] = updatedList.splice(existingIndex, 1);
            setRecentlyUsed([movedItem, ...updatedList]);
        } else {
            setRecentlyUsed([newItem, ...recentlyUsed])
        }
    }

    const recentlyUsedPrep = (newKey, newVal) => {
        setRecentlyUsedObj({...recentlyUsedObj, [newKey]: newVal});
    }

    const currentCard = showCard && !showSpinner ? <WheatherCurrentCard city={city}/> : null
    const weeklyCard = showCard && !showSpinner ? <WeatherWeeklyCards city={city}/> : null
    const spinner = showSpinner ? <Spinner/> : null

    return (
        <>
            <ErrorBoundary>
                <AppHeader city={city}
                            showCard={showCard}
                            setDays={setDays}
                            onCardShow={onCardShow}
                            onCitySelected={onCitySelected}
                            weatherSwitch={weatherSwitch}
                            onWeatherSwitch={onWeatherSwitch}
                            onRequest={onRequestByName}
                            onRequestByCoords={onRequestByCoords}
                            setCity={setCity}
                            recentlyUsedObj={recentlyUsedObj}
                            recentlyUsedPrep={recentlyUsedPrep}/>
            </ErrorBoundary>
            <main className="flex flex-col items-center w-full min-h-screen px-2 sm:px-4 box-border">
                <SearchBanner onShowSpinner={onShowSpinner}
                                onCitySelected={onCitySelected}
                                city={city}
                                onRequest={onRequestByCoords}
                                onRequestByName={onRequestByName}
                                onCardShow={onCardShow}
                                weatherSwitch={weatherSwitch}
                                recentlyUsedObj={recentlyUsedObj}
                                recentlyUsedPrep={recentlyUsedPrep}
                                onRecentlyUsed={onRecentlyUsed}
                                days={days}
                                setDays={setDays}/>
                {weatherSwitch ? weeklyCard : currentCard}
                {spinner}
                <RecentlyUsed onCitySelected={onCitySelected}
                              recentlyUsedPrep={recentlyUsedPrep}
                              city={city}
                              onWeatherSwitch={onWeatherSwitch}
                              weatherSwitch={weatherSwitch}
                              days={days}
                              setDays={setDays}/>
                <div className="w-full flex flex-col items-center mt-auto">
                    <ContactMeBanner/>
                </div>
            </main>
            <footer>
                <ErrorBoundary>
                    <AppFooter/>
                </ErrorBoundary>
            </footer>
        </>
    );
}
    
export default MainPage;