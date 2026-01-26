import { useState } from 'react'

function AppHeader(props) {
    const [inputVal, setInputVal] = useState('');

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
                        className='outline-none max-sm:w-[3rem] border-none text-black text-lg w-full min-w-0'/>
                </div>
            </div>
            <div className="flex max-sm:flex-col max-sm:ml-0 max-sm:w-[4rem] max-sm:items-center justify-end mr-3 md:mr-[5vw] shrink-0">
                <p className='text-white text-sm md:text-base'>There will be a Swtich! <span className='bg-cyan-800 rounded-lg p-1'>Current/Weekly</span></p>
            </div>
        </div>
    )
}

export default AppHeader;
