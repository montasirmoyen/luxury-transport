"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/nav-bar";
import { useAuth } from "@/contexts/auth-context";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  personalInfo?: {
    isTraveler: string;
    passengerName: string;
    airlineName: string;
    flightNumber: string;
    email: string;
    phoneCountryCode: string;
    phone: string;
    mailingAddress: string;
    specialNeeds: string;
  };
  paymentMethod?: string;
}

export default function Receipt() {
  const router = useRouter();
  const { user } = useAuth();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [confirmationNumber, setConfirmationNumber] = useState<string>("");
  const hasSavedRef = useRef(false);
  const isSavingRef = useRef(false);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      const parsed = JSON.parse(data);
      setBookingData(parsed);
      
      const storedConfNum = localStorage.getItem("lastConfirmationNumber");
      const confNum = storedConfNum || `LT-${Date.now().toString().slice(-8)}`;
      
      if (!storedConfNum) {
        localStorage.setItem("lastConfirmationNumber", confNum);
      }
      
      setConfirmationNumber(confNum);

      if (user && !hasSavedRef.current && !isSavingRef.current) {
        saveReservationToFirebase(parsed, confNum);
      }
    } else {
      router.push("/");
    }
  }, [router, user]);

  const saveReservationToFirebase = async (booking: BookingData, confNum: string) => {
    if (!user || hasSavedRef.current || isSavingRef.current) return;

    isSavingRef.current = true;

    try {
      const existingQuery = query(
        collection(db, "reservations"),
        where("userId", "==", user.uid),
        where("confirmationNumber", "==", confNum)
      );
      const existingDocs = await getDocs(existingQuery);

      if (!existingDocs.empty) {
        console.log("Reservation already exists, skipping save");
        hasSavedRef.current = true;
        isSavingRef.current = false;
        return;
      }

      const similarQuery = query(
        collection(db, "reservations"),
        where("userId", "==", user.uid),
        where("date", "==", booking.date),
        where("time", "==", booking.time),
        where("pickUp", "==", booking.pickUp),
        where("dropOff", "==", booking.dropOff),
        where("status", "==", "upcoming")
      );
      const similarDocs = await getDocs(similarQuery);

      if (!similarDocs.empty) {
        console.log("Similar reservation already exists, skipping save");
        hasSavedRef.current = true;
        isSavingRef.current = false;
        return;
      }

      const reservationData = {
        userId: user.uid,
        confirmationNumber: confNum,
        ...booking,
        status: "upcoming",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "reservations"), reservationData);
      hasSavedRef.current = true;
      
      localStorage.removeItem("lastConfirmationNumber");
    } catch (error) {
      console.error("Error saving reservation to Firebase:", error);
    } finally {
      isSavingRef.current = false;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getPaymentMethodName = (method?: string) => {
    const methods: Record<string, string> = {
      cash: "Cash",
      card: "Credit/Debit Card",
      paypal: "PayPal",
      zelle: "Zelle",
      cashapp: "CashApp",
      venmo: "Venmo",
    };
    return methods[method || ""] || "Not specified";
  };

  const getPaymentTotal = () => {
    if (!bookingData?.fareDetails) return 0;
    const fareDetails = bookingData.fareDetails;
    const total = fareDetails.total;

    if (bookingData.paymentMethod === "cash") {
      return total - total * 0.1;
    } else if (bookingData.paymentMethod === "paypal") {
      return total * 1.01;
    }
    return total;
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

  const finalTotal = getPaymentTotal();
  const cashDiscount = bookingData.paymentMethod === "cash" ? fareDetails.total * 0.1 : 0;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="mb-6 flex gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Receipt
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 print:shadow-none">
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Booking Confirmation
              </h1>
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-semibold">Reservation Confirmed</span>
              </div>
              <p className="text-gray-600">Confirmation Number: <span className="font-bold text-gray-800">{confirmationNumber}</span></p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Booking Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Service Type</p>
                  <p className="text-base font-semibold text-gray-800 capitalize">
                    {bookingData.serviceType.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="text-base font-semibold text-gray-800">{bookingData.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Time</p>
                  <p className="text-base font-semibold text-gray-800">{bookingData.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Passengers</p>
                  <p className="text-base font-semibold text-gray-800">
                    {bookingData.passengerCount}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Pick-Up Location</p>
                  <p className="text-base font-semibold text-gray-800">{bookingData.pickUp}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Drop-Off Location</p>
                  <p className="text-base font-semibold text-gray-800">{bookingData.dropOff}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Luggage</p>
                  <p className="text-base font-semibold text-gray-800">
                    {bookingData.luggageCount} pieces
                  </p>
                </div>
              </div>
            </div>

            {bookingData.personalInfo && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Passenger Name</p>
                    <p className="text-base font-semibold text-gray-800">
                      {bookingData.personalInfo.passengerName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-base font-semibold text-gray-800">
                      {bookingData.personalInfo.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="text-base font-semibold text-gray-800">
                      {bookingData.personalInfo.phoneCountryCode} {bookingData.personalInfo.phone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Are you also the traveler?</p>
                    <p className="text-base font-semibold text-gray-800 capitalize">
                      {bookingData.personalInfo.isTraveler || "N/A"}
                    </p>
                  </div>
                  {bookingData.personalInfo.airlineName && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Airline</p>
                      <p className="text-base font-semibold text-gray-800">
                        {bookingData.personalInfo.airlineName}
                      </p>
                    </div>
                  )}
                  {bookingData.personalInfo.flightNumber && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Flight Number</p>
                      <p className="text-base font-semibold text-gray-800">
                        {bookingData.personalInfo.flightNumber}
                      </p>
                    </div>
                  )}
                  {bookingData.personalInfo.mailingAddress && (
                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-600 mb-1">Mailing Address</p>
                      <p className="text-base font-semibold text-gray-800 whitespace-pre-line">
                        {bookingData.personalInfo.mailingAddress}
                      </p>
                    </div>
                  )}
                  {bookingData.personalInfo.specialNeeds && (
                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                      <p className="text-base font-semibold text-gray-800 whitespace-pre-line">
                        {bookingData.personalInfo.specialNeeds}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Vehicle Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Selected Vehicle</p>
                  <p className="text-base font-semibold text-gray-800">
                    {bookingData.vehicleName || "2 Passenger Sedan"}
                  </p>
                </div>
                {/*<div>
                  <p className="text-sm text-gray-600 mb-1">Distance</p>
                  <p className="text-base font-semibold text-gray-800">00 Miles</p>
                </div>*/}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Payment Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Fare</span>
                  <span className="font-semibold text-gray-800">${fareDetails.estimatedFare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gratuity (20% of Estimated fare)</span>
                  <span className="font-semibold text-gray-800">${fareDetails.gratuity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Airport Toll Tax</span>
                  <span className="font-semibold text-gray-800">${fareDetails.tollTax.toFixed(2)}</span>
                </div>
                {fareDetails.nightCharges > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Night Charges</span>
                    <span className="font-semibold text-gray-800">${fareDetails.nightCharges.toFixed(2)}</span>
                  </div>
                )}
                {fareDetails.extraLuggageCharges && fareDetails.extraLuggageCharges > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Extra Luggage Charges</span>
                    <span className="font-semibold text-gray-800">
                      ${fareDetails.extraLuggageCharges.toFixed(2)}
                    </span>
                  </div>
                )}
                {cashDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="font-semibold">Cash Discount (10% off)</span>
                    <span className="font-semibold">-${cashDiscount.toFixed(2)}</span>
                  </div>
                )}
                {bookingData.paymentMethod === "paypal" && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">PayPal Processing Fee (1%)</span>
                    <span className="font-semibold text-gray-800">
                      ${(fareDetails.total * 0.01).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t-2 border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="text-lg font-bold text-gray-800">
                    {getPaymentMethodName(bookingData.paymentMethod)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
              <p className="text-gray-600 mb-2">
                Thank you for choosing Boston Luxury Express!
              </p>
              <p className="text-sm text-gray-500">
                Your reservation has been confirmed. You will receive a confirmation email shortly.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                For any questions or changes, please contact us with your confirmation number:{" "}
                <span className="font-bold">{confirmationNumber}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

