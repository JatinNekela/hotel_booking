import Booking from "../models/Booking";
import Room from "../models/Room";


// function to check availability
const checkAvailability = async({checkInDate, checkOutDate, room}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate : {$lte : checkOutDate},
            checkOutDate : {$gte : checkInDate}
        });
        const isAvailable = bookings.length === 0;
        return isAvailable
    } catch (error) {
        console.error(error.message);
    }
}

//api to check availability of room 
// POST /api/booking/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const {room, checkInDate, checkOutDate} =res.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({success: true, isAvailable});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

//API to create new booking 
export const createBooking = async(req, res) => {
    try {
        const {room, checkInDate, checkOutDate} =res.body;
        const user = req.user._id;
        //before booking check availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });
        if(!isAvailable)
            return res.json({success: false , message: "room not available"});
        //get room price
        const roomData = Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;
        //calculate total price  
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timediff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timediff / (1000*3600*24));
        totlaPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel : roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        })
        return res.json({success: true , message: "Booking created successfully"});
    } catch (error) {
        console.log(error);
        return res.json({success: false , message: "Failed to create booking"});
    }
}