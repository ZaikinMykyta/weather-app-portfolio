import SunCard from "../WeatherInfoCards/SunCard/SunCard";
import WindCard from "../WeatherInfoCards/WindCard/WindCard";

const WheatherCurrentCard = ({city}) => {
    
    if (!city || !city.name) {
        return null;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = {  month: 'short', year:'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
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

    const date = new Date();
    // date.getTimezoneOffset(city.timezone) / 60
    return (
        <div className="flex justify-center items-center mt-6 sm:mt-8 px-3 sm:px-4 z-0 w-full max-w-5xl mx-auto">
            <div className={`
                w-full max-w-2xl
                rounded-2xl
                sm:rounded-3xl
                bg-gradient-to-br ${getGradient(city.temp)}
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
                        <p className="text-sm sm:text-base text-white/80 mb-1 sm:mb-2 truncate">{city.name}, {city.country}, {`UTC${city.timezone / 3600}`}</p>
                        <p className="text-4xl sm:text-5xl font-bold text-white">{city.temp}</p>
                    </div>
                    
                    <div className="flex flex-col items-end shrink-0">
                        <img 
                            src={city.icon} 
                            alt={city.description} 
                            className="w-14 h-14 sm:w-20 sm:h-20 object-contain filter drop-shadow-md"
                        />
                        <p className="text-sm text-white/70 mt-2">Today</p>
                    </div>
                </div>

                <div className="mb-4 sm:mb-6 relative z-10">
                    <p className="text-base sm:text-lg font-medium mb-1 capitalize text-white/90">{city.description}</p>
                    {city.dayTime && (
                        <p className="text-sm text-white/60">{formatDate(city.dayTime)}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 max-sm:grid-cols-3 sm:grid-cols-3 gap-3 max-sm:gap-2 sm:gap-4 relative z-10">
                    <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                        <p className="text-xs text-white/60 mb-1">Feels like</p>
                        <p className="text-base sm:text-lg font-semibold text-white">{city.feels_like}</p>
                    </div>
                    <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                        <p className="text-xs text-white/60 mb-1">Humidity</p>
                        <p className="text-base sm:text-lg font-semibold text-white">{city.humidity}</p>
                    </div>
                    <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                        <p className="text-xs text-white/60 mb-1">Visibility</p>
                        <p className="text-base sm:text-lg font-semibold text-white">{city.visibility}</p>
                    </div>
                    {/* <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                        <p className="text-xs text-white/60 mb-1">Sunset</p>
                        <p className="text-base sm:text-lg font-semibold text-white mb-2">{city.sunset != null ? formatDate(city.sunset) : '—'}</p>
                        <p className="text-xs text-white/60 mb-1">Sunrise</p>
                        <p className="text-base sm:text-lg font-semibold text-white">{city.sunrise != null ? formatDate(city.sunrise) : '—'}</p>
                    </div>
                    <div className="bg-[#2F2F2F]/80 backdrop-blur-sm col-span-2 rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                        <p className="text-xs text-white/60 mb-1">Wind</p>
                        <p className="text-base sm:text-lg font-semibold text-white">{city.wind_speed}</p>
                        {city.wind_deg != null && (
                            // <div className="flex items-center gap-2 mt-2">
                            //     <img
                            //         src="https://www.freeiconspng.com/uploads/arrow-icon-28.png"
                            //         alt=""
                            //         className="w-6 h-6 object-contain"
                            //         style={{ transform: `rotate(${city.wind_deg}deg)` }}
                            //     />
                            //     <span className="text-base sm:text-lg font-semibold text-white">{city.wind_deg}°</span>
                            // </div>
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
                                            style={{ transform: `rotate(${city.wind_deg}deg)` }}>
                                        <div className="relative left-[0.9vw] top-[-0.5vh] bg-black w-[1vw] rounded-2xl h-[3vh] rotate-45"></div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="bg-black rounded-t-2xl w-[1vw] h-[2.7vh]"></div>
                                            <span className="relative top-[0.1vh] text-base sm:text-lg font-semibold text-white"
                                                    style={{ transform: `rotate(${-city.wind_deg}deg)` }}>
                                            {city.wind_deg}°</span>
                                            <div className="bg-black rounded-b-2xl w-[1vw] h-[3vh]"></div>
                                        </div>
                                        <div className="relative left-[-0.9vw] top-[-0.5vh] bg-black w-[1vw] h-[3vh] rounded-2xl rotate-[-45deg]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> */}
                    <div className="grid col-span-2 gap-3 h-[22vh] sm:gap-4">
                        <SunCard sunrise={city.sunrise} sunset={city.sunset} />
                    </div>
                    <div className="grid gap-3 sm:gap-4">
                        <WindCard wind_speed={city.wind_speed} wind_deg={city.wind_deg} />
                    </div>
                </div>

                {/* Минимальная и максимальная температура */}
                <div className="flex justify-between items-center mt-4 sm:mt-6 text-sm relative z-10">
                    <div className="flex items-center gap-2">
                        <span className="text-white/60">Min:</span>
                        <span className="font-semibold text-white">{city.temp_min}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-white/60">Max:</span>
                        <span className="font-semibold text-white">{city.temp_max}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WheatherCurrentCard;