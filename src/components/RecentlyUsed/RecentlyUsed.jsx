import { useState, useEffect } from "react";
import WeatherService from "../../services/WheatherService";

const RecentlyUsed = (props) => {

    const [parsed, setParsed] = useState([]);

    useEffect(() => {
        try{
            const data = window.localStorage.getItem('recently used');
            if(data) {
                setParsed(JSON.parse(data))
            }
        }catch(err){
            console.error(err)
        }

    }, [props.city]);
    
    const {getCity} = WeatherService();


    const renderRecentCards = (data) => {
        if(data.length < 1) {
            return <p className="text-white text-lg mt-4">No recently used items</p>
        } else {
            
            const items = data.map((item,i) => {
                 return(
                    <li key={i} className="flex-shrink-0 mr-[1vw]">
                        <button className="flex flex-col justify-between items-center cursor-pointer bg-gradient-to-b from-slate-700 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 w-32 sm:w-40 md:w-48 h-40 sm:h-52 md:h-60 text-center border border-white/10 hover:border-white/30"
                                onClick={() => {
                                    getCity(item.name, 1).then(res => {
                                        props.onCitySelected(res[0]);
                                        props.recentlyUsedPrep('name', item.name); 
                                        props.onWeatherSwitch(item.type === 'current' ? 0 : 1);
                                        props.setDays(item.days);
                                    })
                                }}>
                            
                            {item.icon && (
                                <div className="mb-2 sm:mb-3">
                                    <img 
                                        src={item.icon} 
                                        alt={item.type}
                                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                                    />
                                </div>
                            )}
                            
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-white text-sm sm:text-lg md:text-2xl font-bold break-words">{item.name}</p>
                            </div>
                            
                            <div className="border-t border-white/20 pt-2 sm:pt-3 w-full">
                                {item.days !== '' && item.days !== 0 && (
                                    <p className="text-white/70 text-xs sm:text-sm md:text-base mb-1">{item.days} days</p>
                                )}
                                <p className="text-white/90 text-xs sm:text-sm md:text-base font-semibold">
                                    {item.type === 'weekly' ? '📊 Weekly' : '🔍 Current'}
                                </p>
                            </div>
                        </button>
                    </li>
                )
            })
    
            return(
                <ul className="flex items-center mt-6 sm:mt-8 px-3 sm:px-4 z-0 w-full max-w-5xl">
                    {items}
                </ul>
            )
        }
    }

    const items = renderRecentCards(parsed);

    return (
        <div className="flex flex-col items-center mt-6 sm:mt-8 px-3 sm:px-4 z-0 w-full max-w-5xl mx-auto">
            <div className="flex items-center mt-6 sm:mt-8 px-3 sm:px-4 z-0 w-full max-w-5xl mx-auto">
                <h1 className="text-white text-2xl font-bold">Recently Used</h1>
            </div>
            {items}
        </div>
    )
}

export default RecentlyUsed;