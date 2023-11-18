import React from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbars from './components/Navbars'
import { useUser } from '../../context/Users.context'

export default function ApplicationLayout() {

  const {open} = useUser();

  return (
    <div className='flex'>
      <div className={`${open ? "w-80 bg-white" : "w-24"}`}>
        <Sidebar/>
      </div>
      <div style={{width:"1592px"}}>
        <Navbars/>
        <Outlet/>
      </div>
    </div>
  )
}
