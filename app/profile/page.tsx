"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { useAuth } from "@/contexts/auth-context";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Edit, Trash2, Calendar, MapPin, Users, ChevronDown, ChevronUp, Save, X } from "lucide-react";
import moment from "moment";

interface Reservation {
  id: string;
  confirmationNumber: string;
  date: string;
  time: string;
  serviceType: string;
  rideType: string;
  pickUp: string;
  dropOff: string;
  passengerCount: number;
  luggageCount: number;
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
  status: string;
  createdAt: string;
}

export default function Profile() {
  const { user, loading: authLoading, updateProfile } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Reservation>>({});
  const [showPastReservations, setShowPastReservations] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
        return;
      }
      setUsername(user.profileData?.username || user.displayName || "");
      fetchReservations();
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && !editingProfile) {
      setUsername(user.profileData?.username || user.displayName || "");
    }
  }, [user, editingProfile]);

  const fetchReservations = async () => {
    if (!user) return;

    try {
      const q = query(collection(db, "reservations"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const reservationsData: Reservation[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reservationsData.push({
          id: doc.id,
          ...data,
        } as Reservation);
      });

      reservationsData.sort((a, b) => {
        const dateA = moment(`${a.date} ${a.time}`, "YYYY-MM-DD HH:mm");
        const dateB = moment(`${b.date} ${b.time}`, "YYYY-MM-DD HH:mm");
        return dateA.diff(dateB);
      });

      setReservations(reservationsData);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    try {
      await updateDoc(doc(db, "reservations", id), {
        status: "cancelled",
        updatedAt: new Date().toISOString(),
      });
      fetchReservations();
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert("Failed to cancel reservation. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this reservation? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "reservations", id));
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
      alert("Failed to delete reservation. Please try again.");
    }
  };

  const handleEdit = (reservation: Reservation) => {
    setEditingId(reservation.id);
    setEditForm({
      date: reservation.date,
      time: reservation.time,
      pickUp: reservation.pickUp,
      dropOff: reservation.dropOff,
      passengerCount: reservation.passengerCount,
      luggageCount: reservation.luggageCount,
    });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateDoc(doc(db, "reservations", id), {
        ...editForm,
        updatedAt: new Date().toISOString(),
      });
      setEditingId(null);
      setEditForm({});
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
      alert("Failed to update reservation. Please try again.");
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      await updateProfile({
        username: username,
      });
      setEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const isUpcoming = (reservation: Reservation) => {
    const reservationDate = moment(`${reservation.date} ${reservation.time}`, "YYYY-MM-DD HH:mm");
    return reservationDate.isAfter(moment()) && reservation.status === "upcoming";
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const upcomingReservations = reservations.filter(isUpcoming);
  const pastReservations = reservations.filter((r) => !isUpcoming(r));
  const totalReservations = reservations.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  {user?.photoURL || user?.profileData?.profilePicture ? (
                    <img
                      src={user.photoURL || user.profileData?.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                      {username.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1">
              {editingProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditingProfile(false);
                        setUsername(user?.profileData?.username || user?.displayName || "");
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{username || "User"}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-gray-600">Total Reservations</p>
                      <p className="text-2xl font-bold text-blue-600">{totalReservations}</p>
                    </div>
                    <div className="bg-green-50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-gray-600">Upcoming</p>
                      <p className="text-2xl font-bold text-green-600">{upcomingReservations.length}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 w-fit"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Reservations</h2>

          {upcomingReservations.length === 0 && pastReservations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600 mb-4">You don't have any reservations yet.</p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Make a Reservation
              </Link>
            </div>
          ) : (
            <>
              {upcomingReservations.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Reservations</h3>
                  <div className="grid gap-6">
                    {upcomingReservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-gray-800">
                                Confirmation: {reservation.confirmationNumber}
                              </h3>
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                {reservation.status}
                              </span>
                            </div>

                            {editingId === reservation.id ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input
                                      type="date"
                                      value={editForm.date}
                                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                    <input
                                      type="time"
                                      value={editForm.time}
                                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pick-Up</label>
                                    <input
                                      type="text"
                                      value={editForm.pickUp}
                                      onChange={(e) => setEditForm({ ...editForm, pickUp: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Drop-Off</label>
                                    <input
                                      type="text"
                                      value={editForm.dropOff}
                                      onChange={(e) => setEditForm({ ...editForm, dropOff: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                                    <input
                                      type="number"
                                      value={editForm.passengerCount}
                                      onChange={(e) => setEditForm({ ...editForm, passengerCount: parseInt(e.target.value) })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                      min="1"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Luggage</label>
                                    <input
                                      type="number"
                                      value={editForm.luggageCount}
                                      onChange={(e) => setEditForm({ ...editForm, luggageCount: parseInt(e.target.value) })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                      min="0"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveEdit(reservation.id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                  >
                                    Save Changes
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingId(null);
                                      setEditForm({});
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-2">
                                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                                  <div>
                                    <p className="text-sm text-gray-600">Date & Time</p>
                                    <p className="font-semibold text-gray-800">
                                      {moment(reservation.date).format("MMM DD, YYYY")} at {reservation.time}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                                  <div>
                                    <p className="text-sm text-gray-600">Pick-Up</p>
                                    <p className="font-semibold text-gray-800">{reservation.pickUp}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                                  <div>
                                    <p className="text-sm text-gray-600">Drop-Off</p>
                                    <p className="font-semibold text-gray-800">{reservation.dropOff}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                                  <div>
                                    <p className="text-sm text-gray-600">Passengers & Luggage</p>
                                    <p className="font-semibold text-gray-800">
                                      {reservation.passengerCount} passengers, {reservation.luggageCount} luggage
                                    </p>
                                  </div>
                                </div>
                                {reservation.vehicleName && (
                                  <div>
                                    <p className="text-sm text-gray-600">Vehicle</p>
                                    <p className="font-semibold text-gray-800">{reservation.vehicleName}</p>
                                  </div>
                                )}
                                {reservation.fareDetails && (
                                  <div>
                                    <p className="text-sm text-gray-600">Total</p>
                                    <p className="font-semibold text-blue-600 text-lg">
                                      ${reservation.fareDetails.total.toFixed(2)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {editingId !== reservation.id && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(reservation)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Change
                              </button>
                              <button
                                onClick={() => handleCancel(reservation.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pastReservations.length > 0 && (
                <div>
                  <button
                    onClick={() => setShowPastReservations(!showPastReservations)}
                    className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition"
                  >
                    {showPastReservations ? (
                      <>
                        <ChevronUp className="w-5 h-5" />
                        Hide Past Reservations ({pastReservations.length})
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5" />
                        Show Past Reservations ({pastReservations.length})
                      </>
                    )}
                  </button>

                  {showPastReservations && (
                    <div className="grid gap-6">
                      {pastReservations.map((reservation) => (
                        <div
                          key={reservation.id}
                          className="bg-white rounded-lg shadow-lg p-6 opacity-75"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                              Confirmation: {reservation.confirmationNumber}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold capitalize">
                                {reservation.status}
                              </span>
                              <button
                                onClick={() => handleDelete(reservation.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2 text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Date & Time</p>
                              <p className="font-semibold text-gray-800">
                                {moment(reservation.date).format("MMM DD, YYYY")} at {reservation.time}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Pick-Up</p>
                              <p className="font-semibold text-gray-800">{reservation.pickUp}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Drop-Off</p>
                              <p className="font-semibold text-gray-800">{reservation.dropOff}</p>
                            </div>
                            {reservation.fareDetails && (
                              <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="font-semibold text-gray-800">
                                  ${reservation.fareDetails.total.toFixed(2)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

