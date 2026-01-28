import { useRef, useState } from 'react';
import WeatherService from '../../services/WheatherService';

const {getCity} = WeatherService();

const SearchSelectWeeklyBanner = (props) => {

    const [showCity, setShowCity] = useState(false);
    const [classes, setClasses] = useState('overflow-hidden hidden');
    const [daysClasses, setDaysClasses] = useState('overflow-hidden hidden')
    const [days, setDays] = useState(0);    
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
        if(daysClasses == 'overflow-hidden hidden') {
            setDaysClasses(`overflow-visible visible absolute top-20
                left-2 right-2 sm:right-auto sm:left-8 w-[calc(100%-0.2rem)]
                sm:w-[19vw] max-w-[360px] text-white flex flex-col gap-5
                px-4 sm:px-5 pb-5 bg-[#2F2F2F] border-[#2F2F2F] rounded-lg z-15`)
        } else {
            setDaysClasses('overflow-hidden hidden')
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
                <div onClick={() => {ChooseCity(classes)}}>
                    <div className="text-white">
                        Location
                    </div>
                    <div className="text-white">
                        {props.city.name ? props.city.name : 'Choose your city'}
                    </div>
                </div>
                <div onClick={() => {onDays(daysClasses)}}>
                    <div className="text-white">
                        Days
                    </div>
                    <div className="text-white">
                        <p>{days}</p>
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
                                    onClick={() => {props.onCitySelected(item); ChooseCity(classes); props.onCardShow(false)}}
                                    >
                                        {item.name}, {item.country}, {item.state}
                                </li>
                    }) : null}
                </ul>
            </div>
            <div className={daysClasses}>
                <input type="text" 
                            placeholder="Search" 
                            value={days}
                            className="w-full pl-5 
                            shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] 
                            mt-4 rounded-2xl" 
                            onChange={(e) => setDays(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') {
                                    setDaysClasses('overflow-hidden hidden');
                                }
                            }}/>
                <ul>
                    <li value={2} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden');}}>2</li>
                    <li value={3} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden')}}>3</li>
                    <li value={4} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden')}}>4</li>
                    <li value={5} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden')}}>5</li>
                    <li value={6} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden')}}>6</li>
                    <li value={7} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden')}}>7</li>
                    <li value={8} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden')}}>8</li>
                    <li value={9} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden')}}>9</li>
                    <li value={10} onClick={(e) => {setDays(e.target.value); setDaysClasses('overflow-hidden hidden')}}>10</li>
                </ul>
            </div>
        </div>
        <div className="w-[4vh] h-[4vh] cursor-pointer bg-green-500 
             rounded-[35%] flex items-center justify-center"
             onClick={() => {props.onRequest(props.city.name, days); props.onShowSpinner(true)}}>
            <img className="w-[3vh] h-[3vh]" src="https://static.thenounproject.com/png/888647-200.png" alt="" />
        </div>
    </div>
    )
};

export default SearchSelectWeeklyBanner;