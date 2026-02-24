import { Link } from "react-router-dom";

import AppFooter from "../AppFooter/AppFooter";
import AppHeaderContact from "../AppHeader/AppHeaderContact"
import ContactForm from "../contactForm/ContactForm";

const ContactMe = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <AppHeaderContact/>
            <main className="flex-grow flex items-center justify-center">
                <ContactForm/>
            </main>
            <Link to='/' className="text-white ml-[5vw]"> ← Go Back</Link>
            <footer>
                    <AppFooter/>
            </footer>
        </div>
    )
}

export default ContactMe;