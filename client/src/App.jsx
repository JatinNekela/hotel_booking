import { React } from 'react'
import Navbar from './components/Navbar'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home';
import AllRooms from './pages/AllRooms';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {/* <div className='min-h-[70-vh]'></div>  this is tailwind css */}
      <div className='min-h-[70-vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
