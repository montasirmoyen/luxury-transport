import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                    Terms of Service
                </h1>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                    <p>
                        Welcome to Boston Luxury Express! By using our services, you agree to the following terms and conditions. Please read them carefully.
                    </p>

                    <h2>1. Service Description</h2>
                    <p>
                        Boston Luxury Express provides luxury transportation services, including airport transfers, city tours, and special event transportation. We strive to offer the highest quality service to our customers.
                    </p>

                    <h2>2. Booking and Payment</h2>
                    <p>
                        All bookings must be made through our website or authorized channels. Payment is required at the time of booking. We accept major credit cards and other payment methods as specified on our website.
                    </p>

                    <h2>3. Cancellation Policy</h2>
                    <p>
                        Cancellations made 24 hours before the scheduled pickup time will receive a full refund. Cancellations made within 24 hours of the pickup time may be subject to a cancellation fee.
                    </p>

                    <h2>4. Liability</h2>
                    <p>
                        Boston Luxury Express is not liable for any damages, losses, or injuries that may occur during the use of our services. We recommend that all passengers follow safety guidelines and instructions provided by our chauffeurs.
                    </p>

                    <h2>5. Privacy Policy</h2>
                    <p>
                        We are committed to protecting your privacy. Please refer to our Privacy Policy for information on how we collect, use, and protect your personal data.
                    </p>

                    <h2>6. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes your acceptance of the new terms.
                    </p>

                    <h2>7. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us at support@bostonluxuryexpress.com.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}