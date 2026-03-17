const ErrorMessage = () => {
    return(
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="bg-[#2F2F2F] text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3">
                <span className="text-red-500 text-xl">⚠️</span>
                <p className="text-sm md:text-base">
                    Oops... Something went wrong
                </p>
            </div>

            <button
                className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 transition rounded-full text-black font-semibold"
                onClick={() => window.location.reload()}
            >
                Try again
            </button>
        </div>
    )
}

export default ErrorMessage;