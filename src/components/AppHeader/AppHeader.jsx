import { useEffect, useState } from 'react'

function AppHeader(props) {
    const [inputVal, setInputVal] = useState('');

    useEffect(()=> {
        props.recentlyUsedPrep('type', props.weatherSwitch === 0 ? 'current' : 'weekly');
    }, [props.weatherSwitch])

    const onRequestTypeChange = () => {
        props.onWeatherSwitch(props.weatherSwitch === 0 ? 1 : 0);
        props.recentlyUsedPrep('name', '');
        props.recentlyUsedPrep('days', '');
        props.onCardShow(false)
        props.setCity({})
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
                    min-w-0 w-full max-w-[140px] sm:max-w-[200px] md:max-w-none'>
                    <img onClick={() => props.onRequest(inputVal)} 
                        className="w-[2vh] h-[2vh] min-w-[16px] min-h-[16px] mr-2 cursor-pointer shrink-0"
                        src="https://avatanplus.com/files/resources/original/5753202b8c9ed1551cb5aa38.png" alt="" />
                    <input type="text" 
                        onChange={(e) => setInputVal(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                props.onRequest(inputVal);
                            }
                        }}
                        placeholder='Search'
                        className='outline-none max-sm:w-[5rem] border-none text-black text-lg w-full min-w-0'/>
                </div>
            </div>
            <div className="flex max-sm:flex-col max-sm:ml-0 max-sm:w-[4rem] max-sm:items-center justify-end mr-3 md:mr-[5vw] shrink-0">
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
