import React, { useState } from 'react';

function Navbar({user}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(1); // Set this based on user authentication

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  //console.log(user);
  return (
    
<nav className="bg-white rounded-tr-xl rounded-tl-xl border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <div className="flex items-center">
      <img src="favicon.png" className="h-8 mr-3" alt="Webalar Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Webalar</span>
  </div>
  <div className="flex items-center md:order-2">
      <button onClick={toggleUserMenu} type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src={user ? user.profilePic :  "https://res.cloudinary.com/dnhslyteh/image/upload/v1692808859/male-profile-flat-blue-simple-icon-with-long-shadow_esfk41.jpg"} alt="user photo"/>
      </button>
      {/* <!-- Dropdown menu --> */}
    {
        isUserMenuOpen ? 
        (<div className="z-50  m-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">{user ? user.name : ""}</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user ? user.email : ""}</span>
        </div>
       
      </div>)
      :
      <></>
    }
      
  </div>
 
  </div>
</nav>

  );
}

export default Navbar;
