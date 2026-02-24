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
            setDaysClasses(`overflow-y-auto visible absolute top-full mt-2
                left-0 right-0 w-full
                text-white flex flex-col
                bg-gradient-to-b from-[#3A3A3A] to-[#2F2F2F] 
                border  rounded-xl z-50
                shadow-2xl 
                max-h-[350px]
                2xl:w-[15vw] 2xl:left-[14vw]
                xl:w-[20vw] xl:left-[23vw]
                lg:w-[25vw] lg:left-[23vw]
                md:w-[25vw] md:left-[23vw]
                sm:w-[25vw] sm:left-[23vw]`)
        } else {
            setDaysClasses('overflow-hidden hidden')
        }
        setShowDays(!showDays);
    }

    const onRequestMenus = (target) => {

        if(target.textContent.toLowerCase().includes('location') || target.childNodes[0].textContent.toLowerCase().includes('city')) {
            if(!showDays) {
                ChooseCity(classes);
            } else {
                onDays(daysClasses);
                ChooseCity(classes);
            }
        } else if(target.childNodes[0].textContent.toLowerCase().includes('days') || 
                target.parentElement.parentElement.childNodes[0].innerText.toLowerCase().includes('days')) {
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
    <div className="flex w-full px-4 sm:px-8 max-sm:px-8 md:px-10 
            items-center justify-between gap-4">
        <div className="flex flex-col gap-4 w-full"
            >
            <div className="flex items-center gap-4 sm:gap-6 justify-between w-full">
                <div onClick={(e) => { onRequestMenus(e.target)}} 
                     className="flex-1 relative cursor-pointer">
                    <div className="text-white text-xs opacity-50 uppercase tracking-wide">
                        Location
                    </div>
                    <div className="text-white font-medium text-base truncate mt-1">
                        {props.city.name ? props.city.name : 'Choose your city'}
                    </div>
                </div>
                <div onClick={(e) => {onRequestMenus(e.target)}}
                     className="flex-1 relative cursor-pointer">
                    <div className="text-white text-xs opacity-50 uppercase tracking-wide">
                        Days
                    </div>
                    <div className="text-white font-medium text-base mt-1">
                        <p>{props.days === 0 ? 'Choose days' : props.days + ' days'}</p>
                    </div>
                </div>
            </div>

            <div className={classes}>
                <input type="text" 
                            placeholder="Search" 
                            value={searchCity}
                            autoFocus
                            className="w-full pl-5 
                            shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] 
                            mt-4 rounded-2xl" 
                            onChange={onCitySearch}/>
                <ul className='flex flex-col max-h-[280px] overflow-y-auto'>
                    { Array.isArray(sugestion) && sugestion.length > 0 ? sugestion.map((item, i) => {
                        return <li key={i} 
                                    className='px-4 py-3
                                               cursor-pointer
                                               border-b border-gray-800
                                               text-sm text-white
                                               font-normal
                                               hover:bg-gray-900
                                               rounded-xl
                                               transition-colors duration-150
                                               last:border-b-0' 
                                    onClick={() => {props.onCitySelected(item); props.recentlyUsedPrep('name', item.name); setSearchCity(''); ChooseCity(); props.onCardShow(false)}}
                                    >
                                        {item.name}, {item.country}{item.state ? ', ' + item.state : ''}
                                </li>
                    }) : null}
                </ul>
            </div>

            <div className={daysClasses}>
                <input type="text" 
                        placeholder="Search days..." 
                        className="w-full px-6 py-3
                        bg-transparent text-white placeholder-gray-600
                        border-b border-gray-600
                        focus:outline-none focus:border-white
                        transition-colors duration-300
                        text-sm"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                props.setDays(e.target.value); 
                                props.recentlyUsedPrep('days', e.target.value); 
                                props.onCardShow(false);
                                setDaysClasses('overflow-hidden hidden'); 
                                setShowDays(false);
                            }
                        }}
                        />
                <ul className="grid grid-cols-5 gap-1 p-4">
                    {Array.from({length: 11}, (_, i) => {
                        if(i === 0 || i === 1) {
                            return null;
                        } else {
                            return <li key={i} 
                                        className={`py-3 px-2 text-center text-sm cursor-pointer
                                                   transition-colors duration-200
                                                   border border-gray-700 rounded-xl
                                                   rounded
                                                   ${props.days == i 
                                                       ? 'bg-gray-200 text-black border-white font-semibold' 
                                                       : 'bg-transparent text-white font-normal hover:border-gray-500'
                                                   }`}
                                        onClick={() => {
                                            props.setDays(i); 
                                            props.recentlyUsedPrep('days', i); 
                                            props.onCardShow(false);
                                            setDaysClasses('overflow-hidden hidden'); 
                                            setShowDays(false);}
                                        }
                                    >
                                            {i}
                                    </li>
                        }
                    })}
                </ul>
            </div>
        </div>

        <div className="w-[3vw] h-[3.5vh] 
            min-[140rem]:w-[3.5vw]
            min-[110rem]:w-[4vw]
            2xl:w-[5vw] 2xl:h-[4.5vh]
            xl:w-[6vw] xl:h-[5vh]
            lg:w-[6vw] lg:h-[4.5vh]
            md:w-[9vw] md:h-[4.5vh]
            sm:w-[11vw] sm:h-[4.5vh]
            max-sm:w-[13vw] max-sm:h-[4.5vh]
            cursor-pointer bg-green-500 
            rounded-[35%] flex 
            items-center justify-center"
             onClick={() => {if(props.days){props.onRequest(props.city.name, props.days); props.onShowSpinner(true); props.onRecentlyUsed(props.recentlyUsedObj); props.setDays(0); setSearchCity('')}}}>
            <img className="w-[3vh] h-[3vh]" src="https://static.thenounproject.com/png/888647-200.png" alt="Search" />
        </div>
    </div>
    )
};

export default SearchSelectWeeklyBanner;

