import React, { useState } from 'react'
import './DesktopNav.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutFailure, signOutStart, signOutSuccess } from '../../redux/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';

export default function DesktopNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.user.loading)
  const location = useLocation();
  const [activeItem,setActiveItem]=useState(location.pathname);
  console.log(location);
  const handleNavigation = (item, route) => {
    navigate(route);
  };

 const handleSignOut=async()=>{
  try {
    dispatch(signOutStart())
    const res=await fetch('/api/auth/signout'); 
    const data=await res.json();
    if(data.success===false)
      {
        toast.error(data.message)
         dispatch(signOutFailure(data.message));
         return;
      }
      dispatch(signOutSuccess(data));
      navigate('/')
  } catch (error) {
    toast.error(error.message)
    dispatch(signOutFailure(error.message))
  }
 }
  return (
    <div className='NavContainer'>
        <div>
        <div className='titleContainer'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2GdeSRQ2DaXkzpYev3bYRSbNmB5Kpo16Ug&s" alt="Finovate"  className='finovateIcon'/>
            <h1>Finovate</h1>
        </div>
        <div className='navItems'>
            <div className={`navItem ${activeItem === '/dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('dashboard', '/dashboard')}><img src="/Icons/dashboard.svg" alt=""   className='NavItemIcon'/><p>Dashboard</p></div>
            <div className={`navItem ${activeItem === '/transactions' ? 'active' : ''}`} onClick={() => handleNavigation('transactions', '/transactions')}><img src="/Icons/credit-card.svg" alt=""   className='NavItemIcon'/><p>Transactions</p></div>
            <div className={`navItem ${activeItem === '/profile' ? 'active' : ''}`} onClick={() => handleNavigation('profile', '/profile')} ><img src="/Icons/settings.svg" alt="" className='NavItemIcon' /><p>Profile</p></div>
            
        </div>
       </div>
       <ToastContainer/>
        <div>
        <div className='navItem' onClick={handleSignOut}><img src="/Icons/logout.svg" alt="" className='NavItemIcon' /><p>Logout</p></div>
        </div>
      
    </div>
  )
}
