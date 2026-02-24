import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {Link} from 'react-router-dom';

const ContactMeBanner = () => {
    return(
        <div className="flex justify-between px-[3vw] py-[1.25vh] mt-[3vh] w-[90vw] bg-[#2F2F2F] rounded-xl">
            <div className='flex items-center'>
                <EmailOutlinedIcon fontSize='large'/>
                <div className='flex flex-col ml-5 text-white'>
                    <p>Hey There!</p>
                    <p className='brightness-90 max-w-[40vw]'>If you liked my project, you can contact my via form. Just click this Button! →</p>
                </div>
            </div>
            <Link to='/contact-me' className='flex justify-center whitespace-nowrap sm:x-7 max-sm:px-15 items-center rounded-xl bg-white w-[15vw]'> Contact Me</Link>
        </div>
    )
}

export default ContactMeBanner;