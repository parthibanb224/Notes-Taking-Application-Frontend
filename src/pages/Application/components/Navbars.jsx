// import React from "react";
// import {
//   Navbar,
//   Typography,
//   Button,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
//   IconButton,
// } from "@material-tailwind/react";
// import {
//   UserCircleIcon,
//   ChevronDownIcon,
//   InboxArrowDownIcon,
//   LifebuoyIcon,
//   PowerIcon,
// } from "@heroicons/react/24/outline";
// import { Cog6ToothIcon,BellIcon } from "@heroicons/react/24/solid";
// import { useUser } from "../../../context/Users.context";


// function ProfileMenu() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const { handleLogout } = useUser();

//   const profileMenuItems = [
//     {
//       label: "My Profile",
//       icon: UserCircleIcon,
//     },
//     {
//       label: "Edit Profile",
//       icon: Cog6ToothIcon,
//     },
//     {
//       label: "Inbox",
//       icon: InboxArrowDownIcon,
//     },
//     {
//       label: "Help",
//       icon: LifebuoyIcon,
//     },
//     {
//       label: "Sign Out",
//       icon: PowerIcon,
//       click: () => handleLogout(),
//     },
//   ];


//   const closeMenu = () => setIsMenuOpen(false);

//   return (
//     <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
//       <MenuHandler>
//         <Button
//           variant="text"
//           color="blue-gray"
//           className="flex items-center gap-1 rounded-full py-0.5 pr-6 pl-0.5 lg:ml-auto"
//         >
//           <Avatar
//             variant="circular"
//             size="md"
//             alt="tania andrew"
//             className="border border-gray-900 p-0.5"
//             src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
//           />
//           <ChevronDownIcon
//             strokeWidth={2.5}
//             className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
//               }`}
//           />
//         </Button>
//       </MenuHandler>
//       <MenuList className="p-1">
//         {profileMenuItems.map(({ label, icon, click }, key) => {
//           const isLastItem = key === profileMenuItems.length - 1;
//           return (
//             <MenuItem
//               key={label}
//               onClick={click || closeMenu}
//               className={`flex items-center gap-2 rounded ${isLastItem
//                 ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
//                 : ""
//                 }`}
//             >
//               {React.createElement(icon, {
//                 className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
//                 strokeWidth: 2,
//               })}
//               <Typography
//                 as="span"
//                 variant="small"
//                 className="font-normal"
//                 color={isLastItem ? "red" : "inherit"}
//               >
//                 {label}
//               </Typography>
//             </MenuItem>
//           );
//         })}
//       </MenuList>
//     </Menu>
//   );
// }

// export default function Navbars() {
//   // const [isNavOpen, setIsNavOpen] = React.useState(false);

//   // const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

//   // React.useEffect(() => {
//   //   window.addEventListener(
//   //     "resize",
//   //     () => window.innerWidth >= 960 && setIsNavOpen(false),
//   //   );
//   // }, []);


//   return (
//       <Navbar className="max-w-full p-2 rounded-none nav-bar fixed-top">
//       <div className="relative mx-auto flex items-center text-blue-gray-900">
//         {/* <IconButton
//           size="sm"
//           color="blue-gray"
//           variant="text"
//           // onClick={toggleIsNavOpen}
//           className="ml-auto mr-2 lg:hidden"
//         >
//         </IconButton> */}
//         <ProfileMenu />
//       </div>
//     </Navbar>
//   );
// }


import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { useUser } from '../../../context/Users.context'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbars() {

  const { handleLogout, selectedPhoto, notifications } = useUser();
  const navigate = useNavigate();
  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-end">
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="relative flex rounded-full p-1 me-4 text-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <span><BellIcon className="h-8 w-8" aria-hidden="true" /></span>
                      <span className="icon-button__badge">{notifications.length}</span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {notifications?.map((notifi,index) => 
                          <Menu.Item key={index}>
                          {({ active }) => (
                            <div id="alert-1" role="alert" className={classNames(active ? 'bg-gray-100' : '', 'flex items-center px-4 py-2 text-sm text-gray-700 pointer')}>
                            <span className="sr-only">Info</span>
                            <div className="ml-3 text-sm font-medium">
                              {notifi.title}
                            </div>
                            {/* <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                              <span className="sr-only">Close</span>
                              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                            </button> */}
                          </div>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {selectedPhoto ? <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={selectedPhoto}
                        alt="user"
                      /> : <UserCircleIcon className="h-14 w-14 text-gray-300" aria-hidden="true" />}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            onClick={() => navigate('/ApplicationLayout/myAccount')}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 pointer')}
                          >
                            Profile
                          </p>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 pointer')}
                            onClick={handleLogout}
                          >
                            Sign out
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}