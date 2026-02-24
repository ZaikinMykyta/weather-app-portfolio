import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('https://formspree.io/f/meellarv', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            setSubmitted(true);
            console.log(submitted);

            if(response.ok) {
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                    })
                }, 3000)
            } else {
                console.log('form submission failed')
            }
        }catch(e){
            throw new Error('There has been an error', {cause: e})
        }
    };

    const ContactForm = () => {

        console.log(submitted)
        return (
            <>
               
            </>
        )
    }

    const OnSucessfulSubmission = () => {
        return (
            <div className='bg-[#E4F3E4] brightness-70'>
                hello
            </div>
        )
    }

    return (
        <Form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-[#2F2F2F] rounded-lg shadow-lg">
            {!submitted ? (<>
                <Form.Group className="mb-4 flex flex-col text-white">
                    <Form.Label className="text-sm mb-[1vh] font-medium text-white">
                        Имя
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ваше имя"
                        className="border-gray-300 text-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </Form.Group>
    
                <Form.Group className="mb-4 flex flex-col text-white">
                    <Form.Label className="text-sm mb-[1vh] font-medium text-white">
                        Почта
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="border-gray-300 text-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </Form.Group>
    
                <Form.Group className="mb-4 flex flex-col text-white">
                    <Form.Label className="text-sm mb-[1vh] font-medium text-white">
                        Тема
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Тема сообщения"
                        className="border-gray-300 text-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </Form.Group>
    
                <Form.Group className="mb-5 flex flex-col text-white">
                    <Form.Label className="text-sm mb-[1vh] font-medium text-white">
                        Сообщение
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Ваше сообщение"
                        rows={4}
                        className="border-gray-300 text-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        required
                    />
                </Form.Group>
    
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    Отправить
                </button>
            </>) : <OnSucessfulSubmission/>}
        </Form>
    );
};

export default ContactForm;