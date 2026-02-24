import {Link} from "react-router-dom";

const AppFooter = () => {
    const footerListBtnStyle = 'cursor-pointer'

    return (
        <div className="flex px-[5vw] mt-[3vh] justify-between text-white bg-[#2F2F2F]">
            <div className="flex-col py-[2.5vh]">
                <div>
                    <Link to='/' className="text-2xl">Weather SPA</Link>
                    <p className="text-sm">Your go-to weather information platform!</p>
                </div>
                <p className="mt-[4vh] text-[0.7em] brightness-80">WeatherSpa ©2026</p>
            </div>
            <div className="py-[2.5vh]">
                <ul>
                    <li>
                        <Link to='/help' className={footerListBtnStyle}>Help</Link>
                    </li>
                    <li>
                        <Link to='/faq' className={footerListBtnStyle}>FAQ</Link>
                    </li>
                    <li>
                        <Link to='/custom-service' className={footerListBtnStyle}>Custom service</Link>
                    </li>
                    <li>
                        <Link to='/contact-me' className={footerListBtnStyle}>Contact us</Link>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default AppFooter;