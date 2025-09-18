// AppContext.js
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Attach token automatically with every axios request
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // custom JWT stored after login
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);

    // Fetch all rooms
    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms');
            if (data.success) {
                setRooms(data.rooms);
            } else {
                toast.error(data.message || "Failed to fetch rooms");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch current user using stored token
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user');
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities || []);
            } else {
                toast.error(data.message || "Failed to fetch user");
            }
        } catch (error) {
            console.log("Fetch user error:", error.message);
            // if unauthorized, clear token
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                setUser(null);
            }
        }
    };

    useEffect(() => {
        // only try fetching user if token exists
        if (localStorage.getItem("token")) {
            fetchUser();
        }
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [user]);

    const value = {
        currency,
        navigate,
        user,
        setUser,
        isOwner,
        setIsOwner,
        axios,
        showHotelReg,
        setShowHotelReg,
        showAuth,
        setShowAuth,
        searchedCities,
        setSearchedCities,
        rooms,
        setRooms,
        fetchUser,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
