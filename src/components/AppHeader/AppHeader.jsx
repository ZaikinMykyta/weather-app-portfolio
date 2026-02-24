import { useEffect, useRef, useState } from 'react'

import WheatherService from '../../services/WheatherService';

function AppHeader(props) {
    const [cityHeaderVal, setCityHeaderVal] = useState('');
    const [headerSugestions, setHeaderSugestions] = useState([]);
    const [showCity, setShowCity] = useState(false);
    const [classes, setClasses] = useState('overflow-hidden hidden');
    const debounceTimerRef = useRef(null);
    const searchContainerRef = useRef(null);

    const {getCity} = WheatherService();

    useEffect(()=> {
        props.recentlyUsedPrep('type', props.weatherSwitch === 0 ? 'current' : 'weekly');
    }, [props.weatherSwitch])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                if (showCity) {
                    setShowCity(false);
                    setClasses('overflow-hidden hidden');
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCity]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && showCity) {
                setShowCity(false);
                setClasses('overflow-hidden hidden');
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [showCity]);

    const onRequestTypeChange = () => {
        props.onWeatherSwitch(props.weatherSwitch === 0 ? 1 : 0);
        props.recentlyUsedPrep('name', '');
        props.recentlyUsedPrep('days', '');
        props.onCardShow(false)
        props.setCity({})
    }

    const ChooseCity = () => {

        if(!showCity) {
            setClasses(`overflow-y-auto visible absolute top-14 mt-2
                2xl:left-[10vw] xl:left-[15vw] 
                md:left-[16vw] sm:left-[21vw] max-sm:left-[23vw]
                right-0 w-full
                text-white flex flex-col
                bg-gradient-to-b from-[#3A3A3A] to-[#2F2F2F] 
                rounded-xl z-50
                shadow-2xl shadow-cyan-500/30 backdrop-blur-md
                max-h-[350px] max-w-[30vw]`);
        } else {
            setClasses('overflow-hidden hidden');
        }
        setShowCity(!showCity);
    }

    const onCitySelected = (e) => {
        const value = e.target.value;
        setCityHeaderVal(value);

        if(debounceTimerRef.current){
            clearTimeout(debounceTimerRef.current);
        }

        if(value.trim().length < 2) {
            setHeaderSugestions([]);
            return;
        }

        debounceTimerRef.current = setTimeout(() => {
            ChooseCity();

            getCity(value, 5)
                .then(res => {
                    setHeaderSugestions(Array.isArray(res) ? res : [])
                })
                .catch(err => {
                    throw new Error('There has been some error, try our product later', {cause: err})
                })
        }, import.meta.env.VITE_DEBOUNCE_MS)
    }

    const closeMenu = () => {
        setShowCity(false);
        setClasses('overflow-hidden hidden');
    }

    return (
        <div className="App flex flex-wrap justify-between items-center gap-y-2 bg-[#2F2F2F] min-h-[5vh] py-2 md:py-0 md:h-[5vh] px-3 md:px-0">
            <div className='flex justify-start items-center min-w-0'>
                <a href="#" className='ml-3 md:ml-[5vw] max-sm:w-[4em] text-xl text-white shrink-0'> Weather SPA</a>
                <div className='flex items-center
                    text-white 
                    border-cyan-500 
                    bg-white
                    rounded-xl
                    h-[2.5vh]
                    min-h-[28px]
                    pl-2
                    ml-3 md:ml-6
                    border-2
                    min-w-0 w-full max-w-[140px] searchBar sm:max-w-[200px] md:max-w-none'
                    ref={searchContainerRef}>
                    <img onClick={() => props.onRequest(cityHeaderVal)} 
                        className="w-[2vh] h-[2vh] min-w-[16px] min-h-[16px] mr-2 cursor-pointer shrink-0"
                        src="https://avatanplus.com/files/resources/original/5753202b8c9ed1551cb5aa38.png" alt="" />
                    <input type="text" 
                        onChange={(e) => onCitySelected(e)} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                props.onRequest(cityHeaderVal);
                            }
                        }}
                        placeholder='Search'
                        value={cityHeaderVal}
                        className='outline-none max-sm:w-[5rem] border-none text-black text-lg w-full min-w-0'/>
                    <ul className={classes}>
                        { Array.isArray(headerSugestions) && headerSugestions.length > 0 ? headerSugestions.map((item, i) => {
                            return <li key={i} 
                                        className='px-5 py-3
                                                   hover:bg-gradient-to-r hover:from-cyan-500 hover:from-opacity-10 hover:to-cyan-500 hover:to-opacity-5
                                                   hover:pl-7
                                                   transition-all duration-200 ease-out
                                                   cursor-pointer
                                                   first:rounded-t-lg first:pt-4
                                                   last:rounded-b-lg last:pb-4
                                                   text-sm sm:text-base
                                                   font-medium
                                                   text-gray-100
                                                   border-l-2 border-transparent
                                                   hover:border-l-cyan-500' 
                                        onClick={(e) => {
                                            props.onCitySelected(item); 
                                            props.recentlyUsedPrep('name', item.name); 
                                            closeMenu();
                                            setCityHeaderVal('');
                                            props.onRequestByCoords(item.lat, item.lon)
                                            props.onCardShow(false)}}
                                        >
                                            {item.name}, {item.country}, {item.state}
                                    </li>
                        }) : null}
                    </ul>
                </div>
            </div>
            <div className="flex max-sm:flex-col 
            max-sm:ml-0 max-sm:w-[4rem] 
            max-sm:items-center justify-end 
            mr-3 md:mr-[5vw] shrink-0
            max-sm:mr-[10vw]">
                <div className='flex items-center gap-2'>
                    <p className='text-white text-sm md:text-base'>Current</p>
                    <div
                        className="relative w-[4vh] h-[2vh] bg-white rounded-full cursor-pointer select-none transition-transform duration-150 active:scale-[0.97]"
                        onClick={onRequestTypeChange}
                    >
                        <span
                            className={`absolute 
                                top-1/2 
                                -translate-y-1/2 w-[2vh] 
                                h-[1.75vh] 
                                rounded-full 
                                bg-cyan-800 
                                transition-[left,box-shadow] 
                                duration-300 
                                ease-out 
                                pointer-events-none 
                                shadow-[0_1px_4px_rgba(0,0,0,0.25)]
                                ${props.weatherSwitch === 1 ? 'left-[calc(100%-2vh-2px)]' : 'left-0.5'}`}
                            aria-hidden
                        />
                    </div>
                    <p className='text-white text-sm md:text-base'>Weekly</p>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;