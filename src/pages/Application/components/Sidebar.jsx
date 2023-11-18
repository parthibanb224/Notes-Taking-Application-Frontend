import React from 'react'
// import { BsRecord } from "react-icons/bs"
import { PiNotepad } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { MdSettings } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/Users.context';
import { FaCalendarDays,FaIcons } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";

export default function Sidebar() {
    const {open, setOpen} = useUser();
    const navigate = useNavigate();
    const {signinUser} = useUser();
    const menus = [
        { title: "Dashboard", navi: '/ApplicationLayout/dashboard'},
        { title: "Todos",icon: <FaTasks/>, navi: '/ApplicationLayout/Todos' },
        { title: "Calendar",icon: <FaCalendarDays/>, navi: '/ApplicationLayout/myCalendar' },
        { title: "Contacts",icon: <BiSolidContact/>, navi: '/ApplicationLayout/contacts' },
        { title: "Account", icon: <MdSettings />, navi: '/ApplicationLayout/myAccount'}
    ]

    return (
        <div className={`sticky left-0 top-0 bottom-0 h-screen p-3 pt-8 duration-500 border-r-2 border-r-gray-100`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className={`inline-flex h-14`}>
                {/* {open ? <BsRecord className={`text-3xl absolute right-3 cursor-pointer`} /> : ""} */}
                <PiNotepad className={`bg-white rounded text-5xl duration-500 cursor-pointer  float-left mr-2 ${open && "rotate-[360deg]"}`} />
                <h1 className={`text-gray-800 text-2xl mt-1 ${!open && "hidden"}`}>E-Notes</h1>
            </div>
            <hr className='color-red'></hr>
            <ul className='mt-5'>
                {menus.map((menu, index) => {
                    return (
                                <NavLink to={menu.navi} key={index} className={({ isActive }) => isActive ? "bg-gray-100 text-indigo-500 rounded-lg border-2 border-indigo-500 flex items-center hover:rounded-lg hover:bg-gray-100 p-3 gap-x-4 mt-2" : "border-2 border-white text-gray-500 flex items-center hover:rounded-lg hover:bg-gray-100 p-3 gap-x-4 mt-2"}>
                                    <span className='text-2xl'>{menu.icon ? menu.icon : <RiDashboardFill />}</span>
                                    <span className={`${!open && "hidden"}`}>{menu.title}</span>
                                </NavLink>
                    )
                })}
            </ul>
            <div className={`${!open && "hidden"} text-center mt-24`}>
                <h1 className={`uppercase text-2xl ${!open && "hidden"}`}><b>Hi {signinUser}</b></h1>
                <h2 className={`${!open && "hidden"} mt-1`}>Need help?</h2>
                <h2 className={`${!open && "scale-0"} mt-1`}>Please Check Our Docs</h2>
                <button 
                    className={`${!open && "hidden"} rounded-lg bg-indigo-500 text-white ps-2 pe-2 mt-1`}
                    onClick={()=>navigate('/ApplicationLayout/documentation')}>
                    documentation
                </button>
            </div>
        </div>
    )
}

// {`nav-link text-gray-500 flex items-center hover:rounded-lg hover:bg-gray-100 p-3 gap-x-4`}