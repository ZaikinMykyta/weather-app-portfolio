import {Link} from 'react-router-dom';

function AppHeaderContact() {

    return (
        <div className="App flex flex-wrap justify-between items-center gap-y-2 bg-[#2F2F2F] min-h-[5vh] py-2 md:py-0 md:h-[5vh] px-3 md:px-0">
            <div className='flex justify-start items-center min-w-0'>
                <Link to='/' className='ml-3 md:ml-[5vw] max-sm:w-[4em] text-xl text-white shrink-0'> Weather SPA</Link>
            </div>
        </div>
    )
}

export default AppHeaderContact;
