import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                    Privacy Policy
                </h1>

                <p className="text-lg text-gray-700 mb-8">
                    At Boston Luxury Express, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our services.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                <p className="text-lg text-gray-700 mb-6">
                    We collect the following types of information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and payment information.</li>
                    <li><strong>Booking Details:</strong> Pickup and drop-off locations, date and time of service, and any special requests.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                <p className="text-lg text-gray-700 mb-6">
                    We use your information to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                    <li>Process your bookings and payments.</li>
                    <li>Communicate with you about your reservations and provide customer support.</li>
                    <li>Improve our services and website based on your feedback and usage patterns.</li>
                    <li>Send you promotional offers and updates (you can opt-out at any time).</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
                <p className="text-lg text-gray-700 mb-6">
                    We take the security of your personal information seriously. We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                <p className="text-lg text-gray-700 mb-6">
                    You have the right to access, correct, or delete your personal information. You can also object to the processing of your data or request that we restrict its use. To exercise these rights, please contact us at <a href="mailto:privacy@bostonluxuryexpress.com" className="text-blue-600 underline">privacy@bostonluxuryexpress.com</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
} 