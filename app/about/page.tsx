import Navbar from "../../components/nav-bar";
import Footer from "../../components/footer";
import BookingPanel from "../../components/booking-panel";
import Image from "next/image";
import Rating from "../../components/rating";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Know us better - Boston Luxury Express
            </h1>
            
            <Rating />

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Welcome to Boston Luxury Express. We provide private and luxury transportation service with chauffeured vehicles to users in Boston, MA and other cities and towns of Massachusetts. Though we are most active in the Boston area, you can also find our cars on the roads of Lexington, Arlington, Medford, Newton, Cambridge, Waltham, Weston, Belmont, Concord and even as far as Cape Cod, Brookline, Springfield, Plymouth, Lincoln etc.
              </p>

              <p>
                We offer a clean pricing policy and we promise there will be no hidden fees ever. You can book a child seat or stop-over at the time of making your reservation. Boston Luxury Express stands for comfort and discipline. We will make sure you are never late for a business meeting or never miss a flight. Our drivers reach the destination 15 minutes ahead of schedule and help you reach your destination safely and in the comfort of our well maintained vehicles.
              </p>

              <p>
                We have a strong fleet of Sedans, Minivans and SUVs that can be pre-booked to serve you in any of your ground transportation needs. All our drivers carry valid licenses with permits to operate commercially. We have also personally verified each driver and we use only those with an outstanding track record.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
              <Image
                src="/google-review.png"
                alt="Google Review"
                width={150}
                height={75}
                className="rounded-lg w-auto h-auto"
              />
              <Image
                src="/tripadvisor-review.png"
                alt="Tripadvisor Review"
                width={150}
                height={75}
                className="rounded-lg w-auto h-auto"
              />
              <Image
                src="/trustpilot-review.png"
                alt="Trustpilot Review"
                width={150}
                height={75}
                className="rounded-lg w-auto h-auto"
              />
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

