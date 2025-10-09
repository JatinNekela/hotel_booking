import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
);

const LogoutIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 6.35 6.35">
        <path d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z" />
    </svg>
);

const ProfileIcon = () => (
  <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
    <path d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z" />
  </svg>
);

const DropdownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-slate-400 inline ml-3" viewBox="0 0 24 24">
        <path fillRule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
            clipRule="evenodd" data-original="#000000" />
    </svg>
);

const Navbar = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Hotels", path: "/rooms" },
        { name: "Experience", path: "/" },
        { name: "About", path: "/" },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { user, setUser, navigate, isOwner, setShowHotelReg, setShowAuth } = useAppContext();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/") setIsScrolled(true);
        else setIsScrolled(false);

        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
        toast.success("Logged out successfully!");
    };

    // Hotel button (Dashboard/List your hotel)
    const HotelButton = (
        <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all ${isScrolled ? "text-black" : "text-white"
                }`}
            onClick={() => (isOwner ? navigate("/owner") : setShowHotelReg(true))}
        >
            {isOwner ? "Dashboard" : "List your hotel"}
        </button>
    );

    return (
        <nav
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled
                    ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
                    : "py-4 md:py-6"
                }`}
        >
            {/* Logo */}
            <Link to="/">
                <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`}/>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`}/>
                    </Link>
                ))}

                {user && HotelButton}

                {user ? (
                    <>
                        <div className="relative w-max mx-auto">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} type="button" id="dropdownToggle" className={`px-4 py-2 flex items-center rounded-lg ${isScrolled ? "text-gray-700":"text-white"} text-sm font-medium border border-slate-300 outline-none cursor-pointer`}>
                            <img src="https://readymadeui.com/profile_6.webp" className="w-7 h-7 mr-3 rounded-full shrink-0"></img>
                                {user.username}
                            <DropdownIcon />
                            </button>
                    
                            {isDropdownOpen && (<ul id="dropdownMenu"
                                className="absolute block shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
                                <li
                                    className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-100 text-slate-600 font-medium text-sm cursor-pointer">
                                    <button onClick={() => navigate("/user-profile")} className="flex items-center gap-1 text-sm">
                                        <ProfileIcon /> View profile
                                    </button>
                                </li>
                                <li
                                    className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-100 text-slate-600 font-medium text-sm cursor-pointer">
                                    <button onClick={() => navigate("/my-bookings")} className="flex items-center gap-1 text-sm">
                                        <BookIcon /> My Bookings
                                    </button>
                                </li>
                                <li
                                    className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-100 text-slate-600 font-medium text-sm cursor-pointer">
                                    
                                    <button onClick={handleLogout} className="flex items-center gap-1 text-sm">
                                        <LogoutIcon /> Logout
                                    </button>
                                </li>
                            </ul>)}
                        </div>
                    </>
                ) : (
                    <button onClick={() => setShowAuth(true)} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <img
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    src={assets.menuIcon}
                    alt="menu"
                    className={`${isScrolled && "invert"} h-4 cursor-pointer`}
                />
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
                </button>

                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="hover:text-black"
                    >
                        {link.name}
                    </Link>
                ))}

                {user && HotelButton}

                {user ? (
                    <>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/my-bookings");
                            }}
                            className="flex items-center gap-1 text-sm"
                        >
                            <BookIcon /> My Bookings
                        </button>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-full">
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={() => {  
                            setIsMenuOpen(false);
                            setShowAuth(true);
                        }} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
