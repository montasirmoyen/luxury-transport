import Navbar from "../../components/nav-bar";
import Footer from "../../components/footer";
import BookingPanel from "../../components/booking-panel";
import Image from "next/image";
import Rating from "../../components/rating";

export default function ChildSeat() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Child & Infant Car Seats
            </h1>
            
            <Rating />

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                We Ensure Safety of your Children
              </h2>

              <p>
                Boston Luxury Express service offers the necessary safety requirements for the little travelers. Just the way adult seats are protected, our service offers child seating facilities so that you can rest assured that your children will have a safe journey at any distance traveled.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
                Our Facility
              </h3>

              <p>
                Traveling always requires precautions, even if the vehicle is perfectly safe, the driver is an expert and the traffic is responsible. Safety concerns must be in high-regards especially if traveling with kids.
              </p>

              <p>
                Different cities mark kids traveling concerns differently. For example, Florida requires a responsible adult to provide their child/children with appropriate seating arrangement while traveling in a car. Restraining children while traveling in private cars is rather more noticed, parents are especially particular to ensure the same. Child seats are available that are specifically designed to hold your little one safe while driving.
              </p>

              <p>
                But what happens when the vehicle isn't personal or if it is a commercial transportation vehicle? This safety concern often goes unnoticed while using commercial car services. But regardless of the vehicle, personal or private, safety concerns for children don't change. Hence, it is equally essential to ensure child seating is available even when traveling in commercial transportation.
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

