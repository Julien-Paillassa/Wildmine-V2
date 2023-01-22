import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/wildmine-logo.svg';

const MenuBurger = ({ setOpenMenu }) => {
	const [currentLoc, setCurrentLoc] = useState(window.location.pathname);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset"
    }
  }, []);

  return <div className='modal-background'>
  <div className="bg-grey_light pt-4 flex flex-col px-8 py-4 fixed h-full w-[70%] md:w-[40%]">

    <img
      src={logo}
      alt="Logo wildmine"
      className='w-[4rem] mx-auto'
    />

    <NavLink
      to="/"
      className={`text-black text-2xl font-bold mb-4 mt-4 ${currentLoc === '/' ? 'border-b-2 border-b-secondary_color' : ''}`}
      onClick={() => {
        setCurrentLoc('/');
        setOpenMenu(false);
      }}
    >
      Accueil
    </NavLink>

    {/* <NavLink
      to="/organization"
      className={`text-black text-2xl font-bold mb-4 ${currentLoc === '/organization' ? 'border-b-2 border-b-secondary_color' : ''}`}
      onClick={() => {
        setCurrentLoc('/organization');
        setOpenMenu(false);
      }}
    >
      Organisation
    </NavLink> */}

    <NavLink
      to="/projects"
      className={`text-black text-2xl font-bold mb-4 ${currentLoc === '/projects' ? 'border-b-2 border-b-secondary_color' : ''}`}
      onClick={() => {
        setCurrentLoc('/projects');
        setOpenMenu(false);
      }}
    >
      Projets
    </NavLink>

    <NavLink
      to="/issuesProject"
      className={`text-black text-2xl font-bold mb-4 ${currentLoc === '/issues' ? 'border-b-2 border-b-secondary_color' : ''}`}
      onClick={() => {
        setCurrentLoc('/issues');
        setOpenMenu(false);
      }}
    >
      Tickets
    </NavLink>

    <NavLink
      to="/settings"
      className={`text-black text-2xl font-bold mb-4 ${currentLoc === '/settings' ? 'border-b-2 border-b-secondary_color' : ''}`}
      onClick={() => {
        setCurrentLoc('/settings');
        setOpenMenu(false);
      }}
    >
      Settings
    </NavLink>
  </div>
</div>
};

export default MenuBurger;