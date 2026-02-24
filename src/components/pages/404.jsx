import {Link} from 'react-router-dom'

const Page404 = () =>(
    <div className="flex flex-col items-center justify-center h-screen bg-[#161616] text-gray-800 p-4">
        <h1 className="text-7xl font-extrabold text-red-500 mb-2">404</h1>
        <p className="text-2xl text-white mb-6">Упс… кажется, этой страницы не существует</p>
        <p className="mb-8 text-center text-[#6E3F3F] max-w-md">
            Возможно, вы набрали неправильный адрес или перешли по устаревшей
            ссылке. Давайте вернёмся на главную.
        </p>
        <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow
                       hover:bg-blue-700 transition-colors duration-200"
        >
            На главную
        </Link>
    </div>
)

export default Page404;