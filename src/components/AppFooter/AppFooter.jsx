const AppFooter = () => {
    const footerListBtnStyle = 'cursor-pointer'

    return (
        <div className="flex px-[5vw] mt-[3vh] justify-between text-white bg-[#2F2F2F]">
            <div className="flex-col py-[2.5vh]">
                <div>
                    <a href="#" className="text-2xl">Weather SPA</a>
                    <p className="text-sm">Your go-to weather information platform!</p>
                </div>
                <p className="mt-[4vh] text-[0.7em] brightness-80">WeatherSpa ©2026</p>
            </div>
            <div className="py-[2.5vh]">
                <ul>
                    <li className={footerListBtnStyle}>Help</li>
                    <li className={footerListBtnStyle}>FAQ</li>
                    <li className={footerListBtnStyle}>Custom service</li>
                    <li className={footerListBtnStyle}>Contact us</li>
                </ul>
            </div>
        </div>
    )
}

export default AppFooter;