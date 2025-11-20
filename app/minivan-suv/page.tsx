import Navbar from "../../components/nav-bar";
import Footer from "../../components/footer";
import BookingPanel from "../../components/booking-panel";
import Image from "next/image";
import Rating from "../../components/rating";

export default function MinivanSUV() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Minivan and SUV Transportation
            </h1>
            
            <Rating />

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Boston Luxury Express brings you extremely comfortable and spacious rides for occasions and services like airport transfer, business meetings, wedding parties, prom nights, weekend holiday travel and much more. We can fit about 5-8 passengers and a lot of luggage into our minivans and SUVs.
              </p>

              <p>
                With an SUV or Minivan you can travel more comfortably with your entire family, friends, or colleagues. This also saves you money as in many cases one vehicle will be enough for your entire group. This also enables you to have more fun with your family and group.
              </p>

              <p>
                We also support child seats, which means more safety for our young guests. Be it long distance rides or short trips to airport or school, we strictly adhere to Boston ground transportation rules and comply with child seat norms. If you have one that is great or you can always ask for an infant or booster seat at a very nominal fee.
              </p>

              <p>
                We also offer long distance rides from Boston and other Massachusetts locations to New York, Providence, Maine, Rhode Island etc. Contact us: <a href="tel:16170000000" className="text-blue-600 font-semibold hover:underline">617-000-0000</a> today to know more about our long distance rides.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <Image
                  src="/minivan.png"
                  alt="Minivan"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
                <h3 className="text-lg font-bold text-gray-800 mt-3 text-center">Minivan</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Image
                  src="/suv.png"
                  alt="SUV"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
                <h3 className="text-lg font-bold text-gray-800 mt-3 text-center">SUV</h3>
              </div>
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

