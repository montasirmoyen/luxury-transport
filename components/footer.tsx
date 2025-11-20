export default function Footer() {
    return (
        <footer className="bg-black/5 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Boston Luxury Express. All rights reserved.</p>
                    <p className="text-sm">This is a demo site! Reservations are not real.</p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="/privacy-policy" className="hover:text-gray-400 transition">Privacy Policy</a>
                    <a href="/tos" className="hover:text-gray-400 transition">Terms of Service</a>
                    <a href="/contact" className="hover:text-gray-400 transition">Contact Us</a>
                </div>
            </div>
        </footer>
    )
}