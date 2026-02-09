const WeatherWeeklyCards = ({city}) => {
    const weatherList = city.list || [];

    if (!city || !city.city.name) {
        return null;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = {  month: 'short', year:'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const getGradient = (temp) => {
        const tempNum = parseFloat(temp);
        if (tempNum < 10) {
            return 'from-slate-700 via-blue-800 to-slate-800';
        } else if (tempNum < 20) {
            return 'from-slate-700 via-cyan-800 to-slate-800';
        } else if (tempNum < 27) {
            return 'from-slate-700 via-purple-800 to-slate-800';
        } else {
            return 'from-slate-700 via-orange-800 to-slate-800';
        }
    };
          
    const renderCards = (arr) => {
        const items = arr.map((item,i) => {
            return (
                <li key={i} className="flex justify-center items-center mt-6 sm:mt-8 px-3 sm:px-4 z-0 w-full max-w-2xl mx-auto">
                    <div className={`
                        w-full max-w-2xl
                        rounded-2xl
                        sm:rounded-3xl
                        bg-gradient-to-br ${getGradient((item.temp.min + item.temp.min)/2)}
                        text-white
                        p-4
                        sm:p-6
                        md:p-8
                        shadow-xl
                        border border-white/5
                        relative
                        overflow-hidden
                    `}>
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                        
                        <div className="flex justify-between items-start mb-4 sm:mb-6 relative z-10">
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm sm:text-base text-white/80 mb-1 sm:mb-2 truncate">{city.city.name}, {city.city.country}, {city.city.timezone}</p>
                                <p className="text-4xl sm:text-5xl font-bold text-white">{(item.temp.min + item.temp.min)/2} ℃</p>
                            </div>
                            
                            <div className="flex flex-col items-end shrink-0">
                                <img 
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
                                    alt={item.weather[0].description} 
                                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain filter drop-shadow-md"
                                />
                                <p className="text-sm text-white/70 mt-2">Today</p>
                            </div>
                        </div>
        
                        <div className="mb-4 sm:mb-6 relative z-10">
                            <p className="text-base sm:text-lg font-medium mb-1 capitalize text-white/90">{item.weather[0].description}</p>
                            {item.dt && (
                                <p className="text-sm text-white/60">{formatDate(item.dt)}</p>
                            )}
                        </div>
        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10">
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                <p className="text-xs text-white/60 mb-1">Feels like</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Morning {item.feels_like.morn} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Day {item.feels_like.day} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Eve {item.feels_like.eve} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Night {item.feels_like.night} ℃</p>
                            </div>
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                <p className="text-xs text-white/60 mb-1">Humidity</p>
                                <p className="text-base sm:text-lg font-semibold text-white">{item.humidity} %</p>
                            </div>
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                <p className="text-xs text-white/60 mb-1">Sunrise</p>
                                <p className="text-base sm:text-lg font-semibold text-white mb-2">{item.sunrise ? formatDate(item.sunrise) : '—'}</p>
                                <p className="text-xs text-white/60 mb-1">Sunset</p>
                                <p className="text-base sm:text-lg font-semibold text-white">{item.sunset ? formatDate(item.sunset) : '—'}</p>
                            </div>
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl col-span-2 p-3 sm:p-4 border border-white/5 shadow-md">
                                <p className="text-xs text-white/60 mb-1">Wind</p>
                                <p className="text-base sm:text-lg font-semibold text-white">{item.speed} m/s</p>
                                {item.deg != null && (
                                    <div className="grid grid-rows-3 grid-cols-3 items-center justify-items-center">
                                        <div style={{gridColumn: 2}} className="text-2xl">
                                            N
                                        </div>
                                        <div style={{gridColumn: 3, gridRow: 2}} className="text-2xl">
                                            E
                                        </div>
                                        <div style={{gridColumn: 2, gridRow: 3}} className="text-2xl">
                                            S
                                        </div>
                                        <div style={{gridColumn: 1, gridRow: 2}} className="text-2xl">
                                            W
                                        </div>
                                        <div style={{gridColumn: 2, gridRow: 2}} className="justify-items-center">
                                            <div className="flex justify-center"
                                                 style={{ transform: `rotate(${item.deg}deg)` }}>
                                                <div className="relative left-[0.9vw] top-[-0.5vh] bg-black w-[1vw] rounded-2xl h-[3vh] rotate-45"></div>
                                                <div className="flex flex-col justify-center items-center">
                                                    <div className="bg-black rounded-t-2xl w-[1vw] h-[2.7vh]"></div>
                                                    <span className="relative top-[0.1vh] text-base sm:text-lg font-semibold text-white"
                                                            style={{ transform: `rotate(${-item.deg}deg)` }}>
                                                    {item.deg}°</span>
                                                    <div className="bg-black rounded-b-2xl w-[1vw] h-[3vh]"></div>
                                                </div>
                                                <div className="relative left-[-0.9vw] top-[-0.5vh] bg-black w-[1vw] h-[3vh] rounded-2xl rotate-[-45deg]"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md"
                            style={{gridColumn: 3, gridRow: 2}}
                                >
                                <p className="text-xs text-white/60 mb-1">Temps:</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Morning {item.temp.morn} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Day {item.temp.day} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Eve {item.temp.eve} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Night {item.temp.night} ℃</p>
                            </div>
                        </div>
        
                        <div className="flex justify-between items-center mt-4 sm:mt-6 text-sm relative z-10">
                            <div className="flex items-center gap-2">
                                <span className="text-white/60">Min:</span>
                                <span className="font-semibold text-white">{item.temp.min} ℃</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white/60">Max:</span>
                                <span className="font-semibold text-white">{item.temp.max} ℃</span>
                            </div>
                        </div>
                    </div>
                </li>
            )
        });

        return(
            <ul className="flex flex-wrap">
                {items}
            </ul>
        )
    }
    
    const items = renderCards(weatherList);

    return (
        <div className="z-0">
            {items}
        </div>
    )
};

export default WeatherWeeklyCards;