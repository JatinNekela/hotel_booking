import { React } from 'react'
import Navbar from './components/Navbar'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home';
import AllRooms from './pages/AllRooms';
import Footer from './components/Footer';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      {/* <div className='min-h-[70-vh]'></div>  this is tailwind css */}
      <div className='min-h-[70-vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App
