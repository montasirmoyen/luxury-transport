"use client";

import Image from "next/image";
import Navbar from "../components/nav-bar";
import Footer from "../components/footer";
import BookingPanel from "../components/booking-panel";
import { Calculator, Baby, Luggage, Clock, CreditCard } from "lucide-react";
import Rating from "../components/rating";
import { Car } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const popularCities = [
    "Haverhill, MA",
    "Newton, MA",
    "Medford, MA",
    "Lexington, MA",
    "Waltham, MA",
    "Lincoln, MA",
    "Brookline, MA",
    "Burlington, MA",
    "Allston, MA",
    "Marlborough, MA",
    "Arlington, MA",
    "Winchester, MA",
    "Acton, MA",
    "Brighton, MA",
    "Belmont, MA",
    "Cambridge, MA",
    "Somerville, MA",
    "Stoneham, MA",
    "Wayland, MA",
    "Woburn, MA",
    "Provincetown, MA",
    "Hyannis, MA",
    "Worcester, MA",
    "Woods Hole, MA",
    "Manchester, NH",
    "Concord, NH",
    "Lewiston, ME",
    "Auburn, ME",
    "New Haven, CT",
    "Hartford, CT",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Welcome to Boston Luxury Express</h2>
            <Rating />
            <p className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Premium rides at prices you can afford</p>
            <p className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">No booking fees — pay only at the end of your trip</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
              Available 24/7 for reliable transportation in and around Boston.
              We serve all surrounding states with hotel and airport transfers to Boston Logan,
              plus convenient door-to-door service. Whether you're traveling long-distance or with a group,
              our friendly, professional chauffeurs ensure a safe, smooth, and on-time experience every time.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-2">
              {[
                { icon: Calculator, text: "Instant Fare Estimates" },
                { icon: Baby, text: "Child Seats Available" },
                { icon: Luggage, text: "Ample Luggage Space" },
                { icon: Clock, text: "24/7 Service" },
                { icon: CreditCard, text: "Pay at the End of Your Trip" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <item.icon className="text-blue-600 mr-2 sm:mr-3 flex-shrink-0" size={24} />
                  <span className="text-sm sm:text-base text-gray-800 font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mt-6">
                          <p className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Areas We Serve</p>

              
              <p>
                We are not limited to any location in Boston. In fact, we serve all of Massachusetts depending on your demand. Apart from airport and drop facilities, we also offer door to door transportation services and long distance car services as well.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">
                We Offer Long Distance Rides from Boston To
              </h2>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>New York</li>
                <li>New Hampshire</li>
                <li>Maine</li>
                <li>Rhode Island</li>
                <li>Cape Cod</li>
                <li>Martha's Vineyard</li>
                <li>And More, Just Ask Us!</li>
              </ul>

              <p>
                Our executive transportation service is currently serving Arlington, Belmont, Bedford, Cambridge, and Somerville. We also serve in areas such as Medford, Boston, Lexington, Waltham, Stoneham, Brookline, Burlington, Woburn, Winchester, and Lincoln, Reading, North Reading, and the Boston-metropolitan. We provide quality and professional airport transfers which include door-to-door transportation service and long-distance car services too. We feature a wide-ranging fleet of cars, minivans, and SUVs that often drives clients safely and promptly to their destinations.
              </p>

              <p className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <strong>If your place of origin or destination is not covered in the list, please do not worry or give up yet, use our reservation form and get the correct fare for your transportation request.</strong>
              </p>
            </div>
          </div>
          <div>
            <BookingPanel />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Popular Cities We Have Served
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularCities.map((city, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
              >
                <Car className="text-blue-600 flex-shrink-0" size={20} />
                <span className="text-gray-800 font-medium">{city}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}
