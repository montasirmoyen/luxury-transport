export default function Rating() {
    return (
        <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-5 h-5 ${i < 4 ? "fill-current" : "text-gray-300"}`}
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                    ))}
                </div>
                <span className="ml-2 text-gray-700 font-semibold">4.5 out of 5</span>
            </div>
            <span className="text-gray-600">2,563 votes</span>
        </div>
    )
}