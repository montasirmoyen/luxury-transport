"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/nav-bar";

interface BookingData {
  date: string;
  time: string;
  serviceType: string;
  rideType: string;
  pickUp: string;
  dropOff: string;
  passengerCount: number;
  luggageCount: number;
  childSeats: any[];
  pets: any[];
  totalFare: string;
}

export default function Reservation() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Reservation Confirmation
          </h1>

          {bookingData ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-semibold">Date</p>
                  <p className="text-lg text-gray-800">{bookingData.date}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-semibold">Time</p>
                  <p className="text-lg text-gray-800">{bookingData.time}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-semibold">Service Type</p>
                  <p className="text-lg text-gray-800 capitalize">
                    {bookingData.serviceType.replace("-", " ")}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-semibold">Ride Type</p>
                  <p className="text-lg text-gray-800 capitalize">
                    {bookingData.rideType.replace("-", " ")}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 font-semibold">Pick Up Address</p>
                <p className="text-lg text-gray-800">{bookingData.pickUp}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 font-semibold">Drop Off Address</p>
                <p className="text-lg text-gray-800">{bookingData.dropOff}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-semibold">Passengers</p>
                  <p className="text-lg text-gray-800">{bookingData.passengerCount}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-semibold">Luggage</p>
                  <p className="text-lg text-gray-800">{bookingData.luggageCount}</p>
                </div>
              </div>

              {bookingData.childSeats.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Child Seats</p>
                  <ul className="space-y-1">
                    {bookingData.childSeats.map((seat, index) => (
                      <li key={index} className="text-gray-800 capitalize">
                        • {seat.type} - ${seat.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {bookingData.pets.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Pets</p>
                  <ul className="space-y-1">
                    {bookingData.pets.map((pet, index) => (
                      <li key={index} className="text-gray-800 capitalize">
                        • {pet.type} - ${pet.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t-2 border-gray-200 pt-6 mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">Total Estimated Fare:</p>
                  <p className="text-4xl font-bold text-yellow-600">
                    ${bookingData.totalFare}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="flex-1 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition font-bold text-lg">
                  Complete Reservation
                </button>
                <Link
                  href="/"
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-bold text-lg text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-6">
                No reservation data found. Please start a new booking.
              </p>
              <Link
                href="/"
                className="px-8 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition font-bold text-lg inline-block"
              >
                Back to Booking
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
