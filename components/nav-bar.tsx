"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogIn, LogOut, Home, Baby, Car, Phone, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOut, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const profilePictureUrl = user?.photoURL || user?.profileData?.profilePicture;

    return (
        <main>
            <nav className="shadow-lg bg-white/75 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-3 sm:py-4">
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <img src="/logo.png" alt="LuxeTransport logo" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
                        </Link>
                        <div className="ml-2 sm:ml-4 min-w-0">
                            <p className="text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">Boston Luxury Express</p>
                            <p className="text-sm sm:text-base text-black/80 whitespace-nowrap">Trusted Service Since 2015</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
                        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
                            <Home className="inline-block" size={18} />
                            Home
                        </Link>
                        <Link href="/about" className="hover:text-blue-600 transition flex items-center gap-1">
                            <User className="inline-block" size={18} />
                            About
                        </Link>
                        <Link href="/child-seats" className="hover:text-blue-600 transition flex items-center gap-1">
                            <Baby className="inline-block" size={18} />
                            Child Seats
                        </Link>
                        <Link href="/minivan-suv" className="hover:text-blue-600 transition flex items-center gap-1">
                            <Car className="inline-block" size={18} />
                            Minivan/SUV
                        </Link>
                        <Link href="/contact" className="hover:text-blue-600 transition flex items-center gap-1">
                            <Phone className="inline-block" size={18} />
                            Contact
                        </Link>
                        {!loading && (
                            <>
                                {user ? (
                                    <>
                                        <Link href="/profile" className="hover:text-blue-600 transition flex items-center gap-1">
                                            <User className="inline-block" size={18} />
                                            My Profile
                                        </Link>
                                        <div className="flex items-center gap-3">
                                            {profilePictureUrl && (
                                                <img
                                                    src={profilePictureUrl}
                                                    alt="Profile"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="hover:text-blue-600 transition flex items-center gap-1"
                                            >
                                                <LogOut className="inline-block" size={18} />
                                                Log Out
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <Link href="/login" className="hover:text-blue-600 transition flex items-center gap-1">
                                        <LogIn className="inline-block" size={18} />
                                        Login
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t bg-white">
                        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
                            <Link href="/" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link href="/about" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>
                                About
                            </Link>
                            <Link href="/child-seats" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>
                                Child Seats
                            </Link>
                            <Link href="/minivan-suv" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>
                                Minivan/SUV
                            </Link>
                            <Link href="/contact" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </Link>
                            {!loading && (
                                <>
                                    {user ? (
                                        <>
                                            <Link href="/profile" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>
                                                My Profile
                                            </Link>
                                            <div className="flex items-center gap-3 pt-2 border-t">
                                                {profilePictureUrl && (
                                                    <img
                                                        src={profilePictureUrl}
                                                        alt="Profile"
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setIsMenuOpen(false);
                                                        handleLogout();
                                                    }}
                                                    className="hover:text-blue-600 transition flex items-center gap-1"
                                                >
                                                    <LogOut className="inline-block" size={18} />
                                                    Log Out
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <Link href="/login" className="hover:text-blue-600 transition flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                                            <LogIn className="inline-block" size={18} />
                                            Login
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <div className="relative h-64 sm:h-96 -mt-30">
                <Image
                    src="/skyline.png"
                    alt="LuxeTransport Hero Image"
                    fill
                    className="brightness-90 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
        </main>
    );
}
