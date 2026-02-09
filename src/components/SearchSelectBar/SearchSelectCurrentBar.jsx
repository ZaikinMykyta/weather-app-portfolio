import { useCallback, useEffect, useRef, useState } from 'react';
import WeatherService from '../../services/WheatherService';

const {getCity} = WeatherService();

const SearchSelectCurrentBar = (props) => {

    const [showCity, setShowCity] = useState(false);
    const [classes, setClasses] = useState('overflow-hidden hidden');
    const [searchCity, setSearchCity] = useState('');
    const [sugestion, setSugestion] = useState([]);
    const debouceTimerRef = useRef(null);

    const DEBOUNCE_MS = 1500;

    const ChooseCity = () => {

        if(!showCity) {
            setClasses(`overflow-visible visible absolute top-20
                left-2 right-2 sm:right-auto sm:left-8 w-[calc(100%-0.2rem)]
                sm:w-[19vw] max-w-[360px] text-white flex flex-col gap-5
                px-4 sm:px-5 pb-5 bg-[#2F2F2F] border-[#2F2F2F] rounded-lg z-15`);
        } else {
            setClasses('overflow-hidden hidden');
        }
        setShowCity(!showCity);
    }

    const onCitySearch = (e) => {
        const value = e.target.value;
        setSearchCity(value);

        if(debouceTimerRef.current) {
            clearTimeout(debouceTimerRef.current)
        }        

        if(value.trim().length < 2) {
            setSugestion([]);
            return;
        }
        debouceTimerRef.current = setTimeout(() => {
            getCity(value, 5)
                .then(res => {
                    setSugestion(Array.isArray(res) ? res : []);
                })
                .catch(() => {
                    setSugestion([]);
                })
            debouceTimerRef.current = null;
        },DEBOUNCE_MS)
    }
    
    return (
        <div className="flex w-full px-4 sm:px-6 max-sm:px-8md:px-10 
                pr-4 sm:pr-5 items-center justify-between">
            <div className="flex flex-col px-3 items-start justify-start gap-2"
                >
                <div onClick={() => {ChooseCity(classes)}}>
                    <div className="text-white">
                        Location
                    </div>
                    <div className="text-white">
                        {props.city.name ? props.city.name : 'Choose your city'}
                    </div>
                </div>
                <div className={classes}>
                    <input type="text" 
                            placeholder="Search" 
                            value={searchCity}
                            className="w-full pl-5 
                            shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] 
                            mt-4 rounded-2xl" 
                            onChange={onCitySearch}/>
                    <ul className='flex flex-col'>
                        { Array.isArray(sugestion) && sugestion.length > 0 ? sugestion.map((item, i) => {
                            console.log(item)
                            return <li key={i} 
                                        className='mb-5 py-2 sm:py-0' 
                                        onClick={() => {
                                            props.onCitySelected(item); 
                                            props.recentlyUsedPrep('icon', item.icon)
                                            props.recentlyUsedPrep('name', item.name); 
                                            ChooseCity(classes); 
                                            props.onCardShow(false)}}
                                        >
                                            {item.name}, {item.country}, {item.state}
                                    </li>
                        }) : null}
                    </ul>
                </div>
            </div>
            <div className="w-[4vh] h-[4vh] cursor-pointer bg-green-500 
                rounded-[35%] flex items-center justify-center"
                onClick={() => {
                    props.onRequest(props.city.lat, props.city.lon);
                    props.onShowSpinner(true);
                    props.onRecentlyUsed(props.recentlyUsedObj)
                    }}>
                <img className="w-[3vh] h-[3vh]" src="https://static.thenounproject.com/png/888647-200.png" alt="" />
            </div>
        </div>
    )
};

export default SearchSelectCurrentBar;