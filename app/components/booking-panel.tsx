"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    const [passengerCount, setPassengerCount] = useState(1);
    const [luggageCount, setLuggageCount] = useState(0);
    const [childSeats, setChildSeats] = useState<ChildSeat[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);

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
            dog: 13,
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
        if (!date || !time || !pickUp || !dropOff) {
            alert("Please fill in all required fields");
            return;
        }

        const bookingData = {
            date,
            time,
            serviceType,
            rideType,
            pickUp,
            dropOff,
            passengerCount,
            luggageCount,
            childSeats,
            pets,
            totalFare: calculateFare(),
        };

        localStorage.setItem("bookingData", JSON.stringify(bookingData));

        router.push("/reservation");
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Book Your Ride</h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time
                    </label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Type
                    </label>
                    <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="ride-to-airport">Ride to Airport</option>
                        <option value="ride-from-airport">Ride from Airport</option>
                        <option value="door-to-door">Door to Door Service</option>
                        <option value="long-distance">Long Distance Service</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ride Type
                    </label>
                    <select
                        value={rideType}
                        onChange={(e) => setRideType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="one-way">One Way</option>
                        <option value="round-trip">Round Trip</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pick Up Address
                    </label>
                    <input
                        type="text"
                        placeholder="Enter pick-up address"
                        value={pickUp}
                        onChange={(e) => setPickUp(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Drop Off Address
                    </label>
                    <input
                        type="text"
                        placeholder="Enter drop-off address"
                        value={dropOff}
                        onChange={(e) => setDropOff(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Passenger Count
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                        onChange={(e) => setLuggageCount(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Child Seats</h3>

                {childSeats.map((seat, index) => (
                    <div key={index} className="mb-4 p-4 bg-white rounded border border-gray-300 flex items-center gap-4">
                        <select
                            value={seat.type || ""}
                            onChange={(e) =>
                                updateChildSeat(index, e.target.value as "infant" | "regular" | "booster")
                            }
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="">Select Seat Type</option>
                            <option value="infant">Infant (Below 15 months) - $13</option>
                            <option value="regular">Regular (15 mon - 3 yrs) - $13</option>
                            <option value="booster">Booster (Above 3 years) - $9</option>
                        </select>
                        <button
                            onClick={() => removeChildSeat(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    onClick={addChildSeat}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold"
                >
                    + Add Child Seat
                </button>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pets</h3>

                {pets.map((pet, index) => (
                    <div key={index} className="mb-4 p-4 bg-white rounded border border-gray-300 flex items-center gap-4">
                        <select
                            value={pet.type || ""}
                            onChange={(e) => updatePet(index, e.target.value as "dog" | "cat")}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="">Select Pet</option>
                            <option value="dog">Dog - $13</option>
                            <option value="cat">Cat - $10</option>
                        </select>
                        <button
                            onClick={() => removePet(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    onClick={addPet}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                    + Add Pet
                </button>
            </div>

            <div className="border-t-2 border-gray-200 pt-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm mb-1">Estimated Fare:</p>
                    <p className="text-3xl font-bold text-green-600">${calculateFare()}</p>
                </div>
                <button
                    onClick={handleGetFareEstimate}
                    className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-yellow-600 transition font-bold text-lg"
                >
                    Get Fare Estimate & Continue Reservation
                </button>
            </div>
        </div>
    );
}
