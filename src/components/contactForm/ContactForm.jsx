import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <Form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Name Field */}
            <Form.Group className="mb-4">
                <Form.Label className="text-sm font-medium text-gray-700">
                    Имя
                </Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-4">
                <Form.Label className="text-sm font-medium text-gray-700">
                    Почта
                </Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </Form.Group>

            {/* Subject Field */}
            <Form.Group className="mb-4">
                <Form.Label className="text-sm font-medium text-gray-700">
                    Тема
                </Form.Label>
                <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Тема сообщения"
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </Form.Group>

            {/* Message Field */}
            <Form.Group className="mb-5">
                <Form.Label className="text-sm font-medium text-gray-700">
                    Сообщение
                </Form.Label>
                <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ваше сообщение"
                    rows={4}
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                />
            </Form.Group>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
                Отправить
            </button>
        </Form>
    );
};

export default ContactForm;