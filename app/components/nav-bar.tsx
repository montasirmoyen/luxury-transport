import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-black/95 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <img src="/logo.png" alt="LuxeTransport logo" className="h-10 w-auto" />
                    </Link>
                </div>

                <div className="flex items-center gap-8 text-white font-medium">
                    <Link
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                    >
                        About
                    </Link>
                    <Link
                        href="/child-seats"
                    >
                        Child Seats
                    </Link>
                    <Link
                        href="/areas-served"
                    >
                        Areas We Serve
                    </Link>
                    <Link
                        href="/minivan-suv"
                    >
                        Minivan/SUV
                    </Link>
                    <Link
                        href="/contact"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}
