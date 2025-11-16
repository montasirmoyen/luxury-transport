import Image from "next/image";
import Navbar from "./components/nav-bar";
import BookingPanel from "./components/booking-panel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <BookingPanel />
      </div>
    </div>
  );
}
