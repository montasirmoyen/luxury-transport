import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";

export default function Account() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                    My Account
                </h1>

                <form className="max-w-md space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}