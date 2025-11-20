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
  personalInfo?: any;
}

type PaymentMethod = "cash" | "card" | "paypal" | "zelle" | "cashapp" | "venmo";

export default function Step4() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      router.push("/");
    }
  }, [router]);

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedPayment(method);
  };

  const handleCompleteReservation = () => {
    if (!selectedPayment || !bookingData) return;

    const updatedBooking = {
      ...bookingData,
      paymentMethod: selectedPayment,
    };

    localStorage.setItem("bookingData", JSON.stringify(updatedBooking));
    router.push("/reservation/receipt");
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

  const cashDiscount = fareDetails.total * 0.1;
  const cashTotal = fareDetails.total - cashDiscount;

  const getPaymentTotal = (method: PaymentMethod) => {
    switch (method) {
      case "cash":
        return cashTotal;
      case "card":
      case "zelle":
      case "cashapp":
      case "venmo":
        return fareDetails.total;
      case "paypal":
        return fareDetails.total * 1.01;
      default:
        return fareDetails.total;
    }
  };

  const paymentMethods = [
    {
      id: "cash" as PaymentMethod,
      name: "Cash",
      description: "10% off",
      icon: "💵",
      total: cashTotal,
      discount: cashDiscount,
    },
    {
      id: "card" as PaymentMethod,
      name: "Card",
      description: "Credit/Debit Card",
      icon: "💳",
      total: fareDetails.total,
    },
    {
      id: "paypal" as PaymentMethod,
      name: "PayPal",
      description: "Pay with PayPal",
      icon: "🔵",
      total: fareDetails.total * 1.01,
    },
    {
      id: "zelle" as PaymentMethod,
      name: "Zelle",
      description: "Pay with Zelle",
      icon: "💙",
      total: fareDetails.total,
    },
    {
      id: "cashapp" as PaymentMethod,
      name: "CashApp",
      description: "Pay with CashApp",
      icon: "💚",
      total: fareDetails.total,
    },
    {
      id: "venmo" as PaymentMethod,
      name: "Venmo",
      description: "Pay with Venmo",
      icon: "💙",
      total: fareDetails.total,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Payment Method
              </h1>
              <p className="text-gray-600 mb-6">Step 4 of 4 - Select your payment method</p>

              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => handlePaymentSelect(method.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${selectedPayment === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{method.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {method.id === "cash" && method.discount && (
                          <div className="text-sm text-gray-500 line-through mb-1">
                            ${fareDetails.total.toFixed(2)}
                          </div>
                        )}
                        <div className="text-xl font-bold text-blue-600">
                          ${method.total.toFixed(2)}
                        </div>
                        {method.id === "cash" && (
                          <div className="text-xs text-green-600 font-semibold mt-1">
                            Save ${method.discount?.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedPayment === method.id && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <div className="flex items-center gap-2 text-blue-600">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm font-semibold">Selected</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleCompleteReservation}
                disabled={!selectedPayment}
                className={`w-full px-8 py-3 rounded-lg font-bold text-lg transition ${selectedPayment
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Complete Reservation
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-4">
              <div className="text-right mb-4">
                <span className="text-sm text-gray-600">Step 4 of 4</span>
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

              {selectedPayment && (
                <div className="border-t pt-6 mt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Selected Payment:</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        ${getPaymentTotal(selectedPayment).toFixed(2)}
                      </span>
                    </div>
                    {selectedPayment === "cash" && (
                      <div className="mt-2 text-sm text-green-600 font-semibold">
                        You save ${cashDiscount.toFixed(2)} with cash payment!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

