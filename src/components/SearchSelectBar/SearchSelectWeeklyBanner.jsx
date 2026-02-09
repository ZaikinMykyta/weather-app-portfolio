import { useRef, useState } from 'react';
import WeatherService from '../../services/WheatherService';

const {getCity} = WeatherService();

const SearchSelectWeeklyBanner = (props) => {

    const [showCity, setShowCity] = useState(false);
    const [showDays, setShowDays] = useState(false);
    const [classes, setClasses] = useState('overflow-hidden hidden');
    const [daysClasses, setDaysClasses] = useState('overflow-hidden hidden')
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

    const onDays = () => {
        if(!showDays) {
            setDaysClasses(`overflow-visible visible absolute top-20
                left-10 right-10 sm:right-auto sm:left-8 w-[calc(100%-0.2rem)]
                sm:w-[19vw] max-w-[360px] text-white flex flex-col gap-5
                px-4 sm:px-5 pb-5 bg-[#2F2F2F] border-[#2F2F2F] rounded-lg z-15`)
        } else {
            setDaysClasses('overflow-hidden hidden')
        }
        setShowDays(!showDays);
    }

    const onRequestMenus = (target) => {

        if(target.childNodes[0].textContent.includes('Location') || target.childNodes[0].textContent.includes('city')) {
            if(!showDays) {
                ChooseCity(classes);
            } else {
                onDays(daysClasses);
                ChooseCity(classes);
            }
        } else if(target.childNodes[0].textContent.toLowerCase().includes('days')) {
            if(!showCity) {
                onDays(daysClasses);
            } else {
                onDays(daysClasses);
                ChooseCity(classes);
            }
        }
            
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
        <div className="flex flex-col px-3 items-start justify-startgap-2"
            >
            <div className="flex items-center gap-5 justify-between">
                <div onClick={(e) => { onRequestMenus(e.target)}}>
                    <div className="text-white">
                        Location
                    </div>
                    <div className="text-white">
                        {props.city.name ? props.city.name : 'Choose your city'}
                    </div>
                </div>
                <div onClick={(e) => {onRequestMenus(e.target)}}>
                    <div className="text-white">
                        Days
                    </div>
                    <div className="text-white">
                        <p>{props.days === 0 ? 'Choose days' : props.days}</p>
                    </div>
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
                        return <li key={i} 
                                    className='mb-5 py-2 sm:py-0' 
                                    onClick={() => {props.onCitySelected(item); props.recentlyUsedPrep('name', item.name); ChooseCity(classes); props.onCardShow(false)}}
                                    >
                                        {item.name}, {item.country}, {item.state}
                                </li>
                    }) : null}
                </ul>
            </div>
            <div className={daysClasses}>
                <input type="text" 
                            placeholder="Search" 
                            value={props.days}
                            className="w-full pl-5 
                            shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] 
                            mt-4 rounded-2xl" 
                            onChange={(e) => props.setDays(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') {
                                    setDaysClasses('overflow-hidden hidden');
                                }
                            }}/>
                <ul>
                    {Array.from({length: 11}, (_, i) => {
                        if(i === 0 || i === 1) {
                            return null;
                        } else {
                            return <li key={i} 
                                        value={i} 
                                        onClick={(e) => {
                                            props.setDays(e.target.value); 
                                            props.recentlyUsedPrep('days', e.target.value); 
                                            props.onCardShow(false);setDaysClasses('overflow-hidden hidden')}
                                        }
                                    >
                                            {i}
                                    </li>
                        }
                    })}
                </ul>
            </div>
        </div>
        <div className="w-[4vh] h-[4vh] cursor-pointer bg-green-500 
             rounded-[35%] flex items-center justify-center"
             onClick={() => {props.onRequest(props.city.name, props.days); props.onShowSpinner(true); props.onRecentlyUsed(props.recentlyUsedObj);props.recentlyUsedPrep('icon', `https://openweathermap.org/img/wn/${props.city.weather[0].icon}@2x.png`); props.setDays(0)}}>
            <img className="w-[3vh] h-[3vh]" src="https://static.thenounproject.com/png/888647-200.png" alt="" />
        </div>
    </div>
    )
};

export default SearchSelectWeeklyBanner;