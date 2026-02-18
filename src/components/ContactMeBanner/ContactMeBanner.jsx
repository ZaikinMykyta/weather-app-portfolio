import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {Link} from 'react-router-dom';

const ContactMeBanner = () => {
    return(
        <div className="flex justify-between px-[3vw] py-[1.25vh] mt-[3vh] w-[90vw] bg-[#2F2F2F] rounded-xl">
            <div className='flex items-center'>
                <EmailOutlinedIcon fontSize='large'/>
                <div className='flex flex-col ml-5 text-white'>
                    <p>Hey There!</p>
                    <p className='brightness-90'>If u liked my project, u can contact my via form. Just click this Button!</p>
                </div>
            </div>
            <Link to='/contact-me' className='flex justify-center items-center rounded-xl bg-white w-[15vw]'> Contact Me</Link>
        </div>
    )
}

export default ContactMeBanner;