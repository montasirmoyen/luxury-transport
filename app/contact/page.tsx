import Navbar from "../../components/nav-bar";
import Footer from "../../components/footer";
import BookingPanel from "../../components/booking-panel";
import { Phone, Mail, Clock } from "lucide-react";
import Rating from "../../components/rating";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Get in Touch with Boston Luxury Express
            </h1>

            <Rating />

            <p className="text-lg text-gray-700 mb-8">
              We're just a call, email, or message away! Contact us to book your ride, inquire about our services, or share your feedback. We'll be at your doorstep at the appointed time, ready to serve you.
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      For Immediate Bookings
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Call us: <a href="tel:16170000000" className="text-blue-600 font-semibold hover:underline">1-617-000-0000</a>
                    </p>
                    <p className="text-gray-600 text-sm">
                      or use our online booking form on the homepage
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      For General Inquiries or Feedback
                    </h3>
                    <p className="text-gray-700">
                      Email us at: <a href="mailto:info@bostonluxuryexpress.com" className="text-green-600 font-semibold hover:underline">info@bostonluxuryexpress.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Any kind of Complaint
                    </h3>
                    <p className="text-gray-700">
                      Email us at: <a href="mailto:support@bostonluxuryexpress.com" className="text-red-600 font-semibold hover:underline">support@bostonluxuryexpress.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Clock className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Operating Hours
                    </h3>
                    <p className="text-gray-700 font-semibold">
                      24/7 – We're always here for you!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Looking to get in touch with Boston Luxury Express? We're here to assist you with all your transportation needs in Boston, its suburbs, and throughout Massachusetts and most of New England. Whether you're visiting Boston for the first, second, or 100th time, our cozy chauffeured cars are ready to provide the luxury, security, and comfort you deserve for your special Boston ride.
              </p>

              <p>
                At Boston Luxury Express Transportation Corporation, our highly skilled and affable chauffeurs ensure you reach your destination on time, in style, and with the utmost comfort. We take pride in offering the smoothest ride you'll find anywhere, a standard we've perfected over years in the industry without ever compromising on quality. Once you try our service, we're confident you'll keep coming back for more.
              </p>

              <p className="font-semibold text-gray-800">
                We look forward to serving you and making your journey with Boston Luxury Express a memorable one. Thank you for choosing us!
              </p>
            </div>
          </div>

          <div>
            <BookingPanel />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

