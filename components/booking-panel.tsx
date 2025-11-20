"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import moment from 'moment';
import { motion } from "framer-motion";

interface ChildSeat {
    type: "infant" | "regular" | "booster" | null;
    price: number;
    quantity: number;
}

interface Pet {
    type: "dog" | "cat" | null;
    price: number;
    quantity: number;
}

export default function BookingPanel() {
    const router = useRouter();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [serviceType, setServiceType] = useState("ride-to-airport");
    const [rideType, setRideType] = useState("one-way");
    const [pickUp, setPickUp] = useState("");
    const [dropOff, setDropOff] = useState("");
    const [selectedAirport, setSelectedAirport] = useState("");
    const [passengerCount, setPassengerCount] = useState(1);
    const [luggageCount, setLuggageCount] = useState(0);
    const [childSeats, setChildSeats] = useState<ChildSeat[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    
    const pickUpRef = useRef<HTMLInputElement>(null);
    const dropOffRef = useRef<HTMLInputElement>(null);

    const airports = [
        { value: "logan", label: "Boston Logan Airport (1 Harborside Drive, Boston, MA 02128)" },
        { value: "manchester", label: "Manchester-Boston Regional Airport (1 Airport Rd, Manchester, NH 03103)" },
    ];

    useEffect(() => {
        if (serviceType === "ride-to-airport" && selectedAirport) {
            const airport = airports.find((a) => a.value === selectedAirport);
            if (airport) {
                setDropOff(airport.label);
            }
        }
    }, [selectedAirport, serviceType]);

    const calculateFare = () => {
        const basePrice = 50;
        let total = basePrice;

        childSeats.forEach((seat) => {
            if (seat.type) {
                total += seat.price * seat.quantity;
            }
        });

        pets.forEach((pet) => {
            if (pet.type) {
                total += pet.price * pet.quantity;
            }
        });

        total += luggageCount * 5;

        return total.toFixed(2);
    };

    const addChildSeat = () => {
        setChildSeats([...childSeats, { type: null, price: 0, quantity: 1 }]);
    };

    const updateChildSeat = (index: number, type: "infant" | "regular" | "booster") => {
        const prices: Record<string, number> = {
            infant: 13,
            regular: 13,
            booster: 9,
        };
        const updated = [...childSeats];
        updated[index] = { type, price: prices[type], quantity: 1 };
        setChildSeats(updated);
    };

    const removeChildSeat = (index: number) => {
        setChildSeats(childSeats.filter((_, i) => i !== index));
    };

    const addPet = () => {
        setPets([...pets, { type: null, price: 0, quantity: 1 }]);
    };

    const updatePet = (index: number, type: "dog" | "cat") => {
        const prices: Record<string, number> = {
            dog: 20,
            cat: 10,
        };
        const updated = [...pets];
        updated[index] = { type, price: prices[type], quantity: 1 };
        setPets(updated);
    };

    const removePet = (index: number) => {
        setPets(pets.filter((_, i) => i !== index));
    };

    const handleGetFareEstimate = () => {
        const finalDropOff = serviceType === "ride-to-airport" && selectedAirport 
            ? airports.find((a) => a.value === selectedAirport)?.label || dropOff
            : dropOff;

        if (!date || !time || !pickUp || !finalDropOff) {
            alert("Please fill in all required fields");
            return;
        }

        // Validate date and time are not in the past
        const selectedDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
        if (selectedDateTime.isBefore(moment())) {
            alert("Please select a date and time in the future");
            return;
        }

        const bookingData = {
            date,
            time,
            serviceType,
            rideType,
            pickUp,
            dropOff: finalDropOff,
            passengerCount,
            luggageCount,
            childSeats,
            pets,
            totalFare: calculateFare(),
        };

        localStorage.setItem("bookingData", JSON.stringify(bookingData));

        router.push("/reservation/step2");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100"
        >
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4"
            >
                Get a Free Fare Estimate
            </motion.h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">Book your ride and get an instant fare estimate at no cost.</p>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm"
            >
                <Check className="text-green-600 flex-shrink-0" size={20} />
                <span className="text-sm sm:text-base md:text-lg font-semibold text-green-700 ml-2">
                    Authorized for Curbside Pickup & Drop-off at Airports
                </span>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        min={moment().format("YYYY-MM-DD")}
                        onChange={(e) => {
                            setDate(e.target.value);
                            // If date is today, reset time to ensure it's not in the past
                            if (e.target.value === moment().format("YYYY-MM-DD")) {
                                const currentTime = moment().add(1, 'hour').format("HH:mm");
                                setTime(currentTime);
                            }
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time
                    </label>
                    <input
                        type="time"
                        min={date === moment().format("YYYY-MM-DD") ? moment().add(1, 'hour').format("HH:mm") : "00:00"}
                        value={time}
                        onChange={(e) => {
                            const selectedTime = e.target.value;
                            const selectedDate = date || moment().format("YYYY-MM-DD");
                            const selectedDateTime = moment(`${selectedDate} ${selectedTime}`, "YYYY-MM-DD HH:mm");
                            
                            if (selectedDateTime.isBefore(moment())) {
                                alert("Please select a time in the future");
                                return;
                            }
                            setTime(selectedTime);
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Type
                    </label>
                    <select
                        value={serviceType}
                        onChange={(e) => {
                            setServiceType(e.target.value);
                            if (e.target.value !== "ride-to-airport") {
                                setSelectedAirport("");
                            }
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                    >
                        <option value="ride-to-airport">Ride to Airport</option>
                        <option value="ride-from-airport">Ride from Airport</option>
                        <option value="door-to-door">Door to Door</option>
                        <option value="long-distance">Long Distance</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ride Type
                    </label>
                    <select
                        value={rideType}
                        onChange={(e) => setRideType(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                    >
                        <option value="one-way">One Way</option>
                        <option value="round-trip">Round Trip</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pick-Up Address
                    </label>
                    <input
                        ref={pickUpRef}
                        type="text"
                        placeholder="Enter pick-up address"
                        value={pickUp}
                        onChange={(e) => setPickUp(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Drop-Off Address
                    </label>
                    {serviceType === "ride-to-airport" ? (
                        <select
                            value={selectedAirport}
                            onChange={(e) => setSelectedAirport(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                        >
                            <option value="">Select Airport</option>
                            {airports.map((airport) => (
                                <option key={airport.value} value={airport.value}>
                                    {airport.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            ref={dropOffRef}
                            type="text"
                            placeholder="Enter drop-off address"
                            value={dropOff}
                            onChange={(e) => setDropOff(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Passenger Count
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Luggage Count
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={luggageCount}
                        onChange={(e) => setLuggageCount(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                    />
                </div>
            </div>

            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Child Seats</h3>

                {childSeats.map((seat, index) => (
                    <div key={index} className="mb-4 p-3 sm:p-4 bg-white rounded border border-gray-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        <select
                            value={seat.type || ""}
                            onChange={(e) =>
                                updateChildSeat(index, e.target.value as "infant" | "regular" | "booster")
                            }
                            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                        >
                            <option value="">Select Seat Type</option>
                            <option value="infant">Infant (Below 15 months) - $13</option>
                            <option value="regular">Regular (15 mon - 3 yrs) - $13</option>
                            <option value="booster">Booster (Above 3 years) - $9</option>
                        </select>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeChildSeat(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm sm:text-base hover:bg-red-600 transition shadow-md hover:shadow-lg"
                        >
                            Remove
                        </motion.button>
                    </div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addChildSeat}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:from-green-600 hover:to-emerald-700 transition shadow-md hover:shadow-lg"
                >
                    + Add Child Seat
                </motion.button>
            </div>

            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Pets</h3>

                {pets.map((pet, index) => (
                    <div key={index} className="mb-4 p-3 sm:p-4 bg-white rounded border border-gray-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        <select
                            value={pet.type || ""}
                            onChange={(e) => updatePet(index, e.target.value as "dog" | "cat")}
                            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                        >
                            <option value="">Select Pet</option>
                            <option value="dog">Dog - $13</option>
                            <option value="cat">Cat - $10</option>
                        </select>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removePet(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm sm:text-base hover:bg-red-600 transition shadow-md hover:shadow-lg"
                        >
                            Remove
                        </motion.button>
                    </div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addPet}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:from-green-600 hover:to-emerald-700 transition shadow-md hover:shadow-lg"
                >
                    + Add Pet
                </motion.button>
            </div>

            <div className="border-t-2 border-gray-200 pt-4 sm:pt-6 flex items-center justify-center sm:justify-between">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGetFareEstimate}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    Get Fare Estimate & Continue Reservation
                </motion.button>
            </div>
        </motion.div>
    );
}
