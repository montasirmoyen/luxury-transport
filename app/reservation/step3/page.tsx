"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/nav-bar";

interface BookingData {
  date: string;
  time: string;
  serviceType: string;
  rideType: string;
  pickUp: string;
  dropOff: string;
  passengerCount: number;
  luggageCount: number;
  selectedVehicle?: string;
  vehicleName?: string;
  fareDetails?: {
    estimatedFare: number;
    gratuity: number;
    tollTax: number;
    nightCharges: number;
    extraLuggage?: number;
    extraLuggageCharges?: number;
    total: number;
  };
}

interface PersonalInfo {
  isTraveler: string;
  passengerName: string;
  airlineName: string;
  flightNumber: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  mailingAddress: string;
  specialNeeds: string;
}

const countryCodes = [
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
];

export default function Step3() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [formData, setFormData] = useState<PersonalInfo>({
    isTraveler: "no",
    passengerName: "",
    airlineName: "",
    flightNumber: "",
    email: "",
    phoneCountryCode: "+1",
    phone: "",
    mailingAddress: "",
    specialNeeds: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData) return;

    const updatedBooking = {
      ...bookingData,
      personalInfo: formData,
    };

    localStorage.setItem("bookingData", JSON.stringify(updatedBooking));
    router.push("/reservation/step4");
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const fareDetails = bookingData.fareDetails || {
    estimatedFare: 60,
    gratuity: 12,
    tollTax: 9,
    nightCharges: 10,
    total: 91,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Personal Information
              </h1>
              <p className="text-gray-600 mb-6">
                Contact information of person making reservation:
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Are you also the traveler?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isTraveler"
                        value="yes"
                        checked={formData.isTraveler === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isTraveler"
                        value="no"
                        checked={formData.isTraveler === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Passenger Name
                  </label>
                  <input
                    type="text"
                    name="passengerName"
                    value={formData.passengerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Passenger Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Airline Name
                  </label>
                  <input
                    type="text"
                    name="airlineName"
                    value={formData.airlineName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Airline Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Flight Number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="phoneCountryCode"
                      value={formData.phoneCountryCode}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {countryCodes.map((cc) => (
                        <option key={cc.code} value={cc.code}>
                          {cc.country} ({cc.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mailing Address
                  </label>
                  <textarea
                    name="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mailing Address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Needs
                  </label>
                  <textarea
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Special Needs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                >
                  CONFIRM YOUR BOOKING
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-4">
              <div className="text-right mb-4">
                <span className="text-sm text-gray-600">Step 3 of 4</span>
              </div>
              
              <div className="text-center mb-4">
                <div className="bg-yellow-50 border border-yellow-300 rounded-full px-4 py-2 inline-block">
                  <span className="text-xs font-semibold text-yellow-700">
                    SSL SECURE TRANSACTION
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
                  <button className="text-blue-600 text-sm font-semibold hover:underline">
                    Change
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Service:</span>
                    <span className="ml-2 font-semibold text-gray-800 capitalize">
                      {bookingData.serviceType.replace("-", " ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 font-semibold text-gray-800">{bookingData.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Time:</span>
                    <span className="ml-2 font-semibold text-gray-800">{bookingData.time}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Pick-Up City:</span>
                    <span className="ml-2 font-semibold text-gray-800 block mt-1">
                      {bookingData.pickUp}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Drop-Off City:</span>
                    <span className="ml-2 font-semibold text-gray-800 block mt-1">
                      {bookingData.dropOff}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Passengers:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {bookingData.passengerCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Luggage:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {bookingData.luggageCount} (2 Free + 0 Extra Luggage)
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Vehicle</h3>
                  <button className="text-blue-600 text-sm font-semibold hover:underline">
                    Change
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {bookingData.vehicleName || "2 Passenger Sedan"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Distance Covered:</span>
                    <span className="ml-2 font-semibold text-gray-800">6 Miles</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Estimated Fare:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      ${fareDetails.estimatedFare}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Gratuity:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      ${fareDetails.gratuity.toFixed(2)} (20% of Estimated fare)
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Airport Toll Tax:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      ${fareDetails.tollTax}
                    </span>
                  </div>
                  {fareDetails.nightCharges > 0 && (
                    <div>
                      <span className="text-gray-600">Night Charges:</span>
                      <span className="ml-2 font-semibold text-gray-800">
                        ${fareDetails.nightCharges}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total Payable:</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${fareDetails.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

