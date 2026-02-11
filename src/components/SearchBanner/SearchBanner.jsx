import SearchSelectCurrentBar from '../SearchSelectBar/SearchSelectCurrentBar';
import SearchSelectWeeklyBanner from '../SearchSelectBar/SearchSelectWeeklyBanner';

const SearchBanner = (props) => {

    const SearchCurrentBanner = props.weatherSwitch === 0 ? <SearchSelectCurrentBar onCardShow={props.onCardShow}
                                onShowSpinner={props.onShowSpinner} 
                                onCitySelected={props.onCitySelected} 
                                city={props.city} 
                                onRequest={props.onRequest}
                                recentlyUsedObj={props.recentlyUsedObj}
                                recentlyUsedPrep={props.recentlyUsedPrep}
                                onRecentlyUsed={props.onRecentlyUsed}/> : null;

    const SearchWeeklyBanner = props.weatherSwitch === 1 ? <SearchSelectWeeklyBanner onCardShow={props.onCardShow}
                                onShowSpinner={props.onShowSpinner} 
                                onCitySelected={props.onCitySelected} 
                                city={props.city} 
                                onRequest={props.onRequestByName}
                                recentlyUsedObj={props.recentlyUsedObj}
                                recentlyUsedPrep={props.recentlyUsedPrep}
                                onRecentlyUsed={props.onRecentlyUsed}
                                setDays={props.setDays}
                                days={props.days}/> : null;

    return(
        <div className="
            flex 
            flex-col
            items-center
            w-[90vw]
            max-w-5xl
            mx-auto
            px-1 sm:px-0">
            <div className="relative w-full">
                <img 
                    src="https://images.unsplash.com/photo-1612251557267-4d2ef64bccb5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8" 
                    alt=""
                    className="w-full 
                    h-[30vh] 
                    min-h-[12rem]
                    rounded-2xl sm:rounded-4xl 
                    object-cover 
                    brightness-60 
                    grayscale-40" 
                />
                <div className="absolute 
                     inset-0 
                     flex 
                     flex-col 
                     justify-center 
                     items-center 
                     text-white
                     px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">Stay Updated with Weather SPA</h1>
                    <p className="text-base sm:text-lg text-center">Get accurate weather information at your fingertips!</p>
                </div>
            </div>
            <div className="
                 relative
                 bg-[#2F2F2F]
                 w-[90vw]
                 sm:w-[55vw]
                 md:w-[50vw]
                 max-sm:w-[70vw]
                 max-sm:text-sm
                 h-[5vh]
                 min-h-[3.5rem]
                 flex 
                 justify-center 
                 items-center 
                 py-10
                 rounded-full
                 -mt-12
                 z-10
                 ">
                {SearchCurrentBanner}
                {SearchWeeklyBanner}
            </div>
        </div>
    )
};

export default SearchBanner;