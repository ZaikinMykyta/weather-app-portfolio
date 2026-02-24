import SunCard from "../WeatherInfoCards/SunCard/SunCard";
import TempsCard from "../WeatherInfoCards/TempCard/TempCard";
import WindCard from "../WeatherInfoCards/WindCard/WindCard";
import FeelsLikeCard from "../WeatherInfoCards/FeelsLikeCard/FeelsLikeCard";

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
                            <div className="md:col-span-1 max-sm:col-span-2">
                                <FeelsLikeCard
                                    feelsLike={item.feels_like}
                                    minTemp={item.temp.min}
                                    maxTemp={item.temp.max}
                                />
                            </div>
                            
                            <div className="bg-[#2F2F2F]/80 max-sm:col-start-2 max-sm:row-start-4 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md md:col-span-1">
                                <p className="text-xs text-white/60 mb-2 sm:mb-3 font-semibold uppercase tracking-wide">Humidity</p>
                                <p className="text-2xl sm:text-3xl font-bold text-white">{item.humidity}%</p>
                            </div>
                            
                            <div className="md:col-span-1 max-sm:col-span-2">
                                <TempsCard
                                    temps={item.temp}
                                    minTemp={item.temp.min}
                                    maxTemp={item.temp.max}
                                />
                            </div>
                            <div className="grid col-span-2 gap-3 h-[22vh] sm:gap-4">
                                <SunCard sunrise={item.sunrise} sunset={item.sunset}/>
                            </div>
                            <div className="grid gap-3 sm:gap-4">
                                <WindCard wind_speed={item.speed} wind_deg={item.deg} />
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