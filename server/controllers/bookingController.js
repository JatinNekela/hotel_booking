import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


// function to check availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate }
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        // res.json({sucess: false, message: error.message});
        console.error(error.message);
    }
}

//api to check availability of room 
// POST /api/booking/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API to create new booking 
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const user = req.user._id;
        //before booking check availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });
        if (!isAvailable)   
            return res.json({ success: false, message: "room not available" });
        //get room price
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;
        //calculate total price  
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timediff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timediff / (1000 * 3600 * 24));
        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        })
        return res.json({ success: true, message: "Booking created successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Failed to create booking" });
    }
}

//API to get all bookings of user
// GET /api/booking/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort({ createdAt: -1 })
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: "failed to fetch booking" });
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        if (!hotel)
            return res.json({ success: false, message: "no hotel found" });
        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 });
        // total bookings 
        const totalBookings = bookings.length
        //total revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings}})
    } catch (error) {
        res.json({ success: false, message: "failed to fetch booking"})
    }
}
