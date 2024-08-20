import React from 'react'
import './DesktopNav.css'
export default function DesktopNav() {
  return (
    <div className='NavContainer'>
        <div>
        <div className='titleContainer'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2GdeSRQ2DaXkzpYev3bYRSbNmB5Kpo16Ug&s" alt="Finovate"  className='finovateIcon'/>
            <h1>Finovate</h1>
        </div>
        <div className='navItems'>
            <div className='navItem click'><img src="/Icons/dashboard.svg" alt="" className='NavItemIcon ' /><p>Dashboard</p></div>
            <div className='navItem'><img src="/Icons/credit-card.svg" alt="" className='NavItemIcon' /><p>Transactions</p></div>
            <div className='navItem'><img src="/Icons/category.svg" alt="" className='NavItemIcon' /><p>Categories</p></div>
            <div className='navItem'><img src="/Icons/transaction2.svg" alt="" className='NavItemIcon' /><p>Income</p></div>
            <div className='navItem'><img src="/Icons/transaction1.svg" alt="" className='NavItemIcon' /><p>Expence</p></div>
        </div>
       </div>
        <div>
        <div className='navItem'><img src="/Icons/logout.svg" alt="" className='NavItemIcon' /><p>Logout</p></div>
        </div>
      
    </div>
  )
}
