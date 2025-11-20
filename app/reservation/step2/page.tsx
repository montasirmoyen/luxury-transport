"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  childSeats: any[];
  pets: any[];
  totalFare: string;
}

interface Vehicle {
  id: string;
  name: string;
  image: string;
  baseFare: number;
  maxPassengers: number;
  maxLuggage: number;
  extraLuggagePrice: number;
}

const vehicles: Vehicle[] = [
  {
    id: "sedan",
    name: "2 Passenger Sedan",
    image: "/sedan.png",
    baseFare: 60,
    maxPassengers: 2,
    maxLuggage: 2,
    extraLuggagePrice: 7,
  },
  {
    id: "suv",
    name: "2 Passenger Luxury SUV",
    image: "/suv.png",
    baseFare: 105,
    maxPassengers: 2,
    maxLuggage: 4,
    extraLuggagePrice: 7,
  },
  {
    id: "minivan",
    name: "6 Passenger MiniVan",
    image: "/minivan.png",
    baseFare: 85,
    maxPassengers: 6,
    maxLuggage: 3,
    extraLuggagePrice: 7,
  },
  {
    id: "rst",
    name: "8 Passenger Luxury Minivan",
    image: "/rst.png",
    baseFare: 120,
    maxPassengers: 8,
    maxLuggage: 5,
    extraLuggagePrice: 7,
  },
];

export default function Step2() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [distance, setDistance] = useState(8);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      const parsed = JSON.parse(data);
      setBookingData(parsed);
      
      const recommended = recommendVehicle(parsed.passengerCount, parsed.luggageCount);
      setSelectedVehicle(recommended);
    } else {
      router.push("/");
    }
  }, [router]);

  const recommendVehicle = (passengers: number, luggage: number): Vehicle => {
    if (luggage <= 2 && passengers <= 2) {
      return vehicles[0];
    } else if (luggage <= 3 && passengers <= 2) {
      return vehicles[2];
    } else if (luggage <= 4 && passengers <= 2) {
      return vehicles[1];
    } else {
      return vehicles[3];
    }
  };

  const calculateFare = (vehicle: Vehicle) => {
    if (!bookingData) return { estimatedFare: 0, gratuity: 0, tollTax: 9, nightCharges: 0, extraLuggage: 0, total: 0 };
    
    const baseFare = vehicle.baseFare;
    const gratuity = baseFare * 0.2;
    const tollTax = 9;
    
    const timeHour = parseInt(bookingData.time.split(":")[0] || "0");
    const nightCharges = (timeHour >= 1 && timeHour < 5) ? 10 : 0;
    
    const freeLuggage = vehicle.maxLuggage;
    const extraLuggage = Math.max(0, bookingData.luggageCount - freeLuggage);
    const extraLuggageCharges = extraLuggage * vehicle.extraLuggagePrice;
    
    const estimatedFare = baseFare;
    const total = estimatedFare + gratuity + tollTax + nightCharges + extraLuggageCharges;
    
    return {
      estimatedFare,
      gratuity,
      tollTax,
      nightCharges,
      extraLuggage,
      extraLuggageCharges,
      total,
    };
  };

  const handleContinue = () => {
    if (!selectedVehicle || !bookingData) return;
    
    const fareDetails = calculateFare(selectedVehicle);
    const updatedBooking = {
      ...bookingData,
      selectedVehicle: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      fareDetails,
    };
    
    localStorage.setItem("bookingData", JSON.stringify(updatedBooking));
    router.push("/reservation/step3");
  };

  if (!bookingData || !selectedVehicle) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const fareDetails = calculateFare(selectedVehicle);
  const cashDiscount = fareDetails.total * 0.1;
  const cashTotal = fareDetails.total - cashDiscount;
  const cardTotal = fareDetails.total;
  const paypalTotal = fareDetails.total * 1.01;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Vehicle & Rates</h1>
          <p className="text-gray-600">Step 2 of 4</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Featured Vehicle
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    width={300}
                    height={200}
                    className="w-full sm:w-64 h-auto rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                    {selectedVehicle.name}
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance Covered:</span>
                      <span className="font-semibold">{distance} Miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Fare:</span>
                      <span className="font-semibold">${fareDetails.estimatedFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gratuity (20% of fare):</span>
                      <span className="font-semibold">${fareDetails.gratuity.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Airport Toll Tax:</span>
                      <span className="font-semibold">${fareDetails.tollTax}</span>
                    </div>
                    {fareDetails.nightCharges > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Night Charges:</span>
                        <span className="font-semibold">${fareDetails.nightCharges}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Luggage:</span>
                      <span className="font-semibold">
                        {bookingData.luggageCount} ({selectedVehicle.maxLuggage} Free + Extra Luggage)
                      </span>
                    </div>
                    {fareDetails.extraLuggage > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Extra luggage Charges:</span>
                        <span className="font-semibold">
                          ${fareDetails.extraLuggageCharges?.toFixed(2)} (${selectedVehicle.extraLuggagePrice}/Luggage)
                        </span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-800">Total Payable:</span>
                        <span className="text-lg font-bold text-blue-600">${fareDetails.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="text-lg sm:text-xl font-bold text-blue-600">
                  Total Fare: ${fareDetails.total.toFixed(2)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">SPECIAL OFFER</span>
                    <span className="font-semibold text-gray-800">
                      ${cashTotal.toFixed(2)} PAY BY CASH
                    </span>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                    <span className="font-semibold text-gray-800">
                      ${cardTotal.toFixed(2)} PAY BY CARD
                    </span>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                    <span className="font-semibold text-gray-800">
                      ${paypalTotal.toFixed(2)} PAY BY PAYPAL
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Select Payment Mode in Step 4</p>
                <button
                  onClick={handleContinue}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                >
                  BOOK NOW
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <span className="text-green-600 font-bold text-lg">More car Option</span>
                <p className="text-blue-600 text-sm sm:text-base mt-1">
                  Select Another vehicle options below! that is more spacious and carries more luggage
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {vehicles
                  .filter((v) => v.id !== selectedVehicle.id)
                  .map((vehicle) => {
                    const vehicleFare = calculateFare(vehicle);
                    return (
                      <div
                        key={vehicle.id}
                        className={`border-2 rounded-lg p-4 ${
                          selectedVehicle.id === vehicle.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={vehicle.image}
                          alt={vehicle.name}
                          width={200}
                          height={150}
                          className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                          {vehicle.name}
                        </h4>
                        <div className="space-y-1 text-xs sm:text-sm mb-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Estimated fare:</span>
                            <span className="font-semibold">${vehicleFare.estimatedFare}</span>
                          </div>
                          {vehicleFare.extraLuggage > 0 && (
                            <div className="flex items-center gap-2">
                              <span>🧳</span>
                              <span>${vehicleFare.extraLuggageCharges?.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span>💰</span>
                            <span>${vehicleFare.tollTax}</span>
                          </div>
                          {vehicleFare.nightCharges > 0 && (
                            <div className="flex items-center gap-2">
                              <span>🌙</span>
                              <span>${vehicleFare.nightCharges}</span>
                            </div>
                          )}
                          <div className="flex justify-between pt-2 border-t">
                            <span className="text-gray-600">Total Payable:</span>
                            <span className="font-bold text-blue-600">${vehicleFare.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedVehicle(vehicle)}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition"
                        >
                          RIDE WITH THIS CAR
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Booking Details</h3>
                <button className="text-blue-600 text-sm font-semibold hover:underline">
                  Change
                </button>
              </div>
              <div className="space-y-3 text-sm sm:text-base">
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
                  <span className="ml-2 font-semibold text-gray-800">{bookingData.passengerCount}</span>
                </div>
                <div>
                  <span className="text-gray-600">Luggage:</span>
                  <span className="ml-2 font-semibold text-gray-800">
                    {bookingData.luggageCount} ({selectedVehicle.maxLuggage} Free + Extra Luggage)
                  </span>
                </div>
              </div>
              <div className="mt-6 p-3 bg-green-50 border border-green-300 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Vehicle (Suggested):</span>
                  <button className="text-blue-600 text-sm font-semibold hover:underline">
                    View More Vehicles
                  </button>
                </div>
                <div className="font-semibold text-gray-800">{selectedVehicle.name}</div>
                <div className="mt-2">
                  <span className="text-gray-600">Total Payable:</span>
                  <span className="ml-2 font-bold text-blue-600">${fareDetails.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-3">
                  <span className="text-xs sm:text-sm font-semibold text-blue-700">
                    SSL SECURE TRANSACTION
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

