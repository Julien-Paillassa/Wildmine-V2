import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { userInfo } from '../graphql/UserSession';
import logo from '../images/wildmine-logo.svg';

import '../css/components/TopBar.css';

const TopBar = () => {
	const [currentLoc, setCurrentLoc] = useState(window.location.pathname);
	const [navbar, setNavbar] = useState(false);
	// const [element, setElement] = useState();
	const { data } = useQuery(userInfo);
	const currentUser = data.userInfo;

	window.onscroll = () => {
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	return (
		<nav className={`navbar ${navbar ? 'navActive' : 'navInactive'}`}>
			<NavLink
				className="logo-container"
				to="/"
				onClick={() => setCurrentLoc('/')}
			>
				<img src={logo} alt="Logo wildmine"/>
				</NavLink>
			<div className="topbar-menu-links-container">
				<NavLink
					to="/"
					className={`topbar-menu-link ${currentLoc === '/' ? 'topbar-menu-link-selected' : ''}`}
					onClick={() => setCurrentLoc('/')}
				>
					Accueil
				</NavLink>

				{/* <NavLink
					to="/organization"
					className={`topbar-menu-link ${currentLoc === '/organization' ? 'topbar-menu-link-selected' : ''}`}
					onClick={() => setCurrentLoc('/organization')}
				>
					Organisation
				</NavLink> */}

				<NavLink
					to="/projects"
					className={`topbar-menu-link ${currentLoc === '/projects' ? 'topbar-menu-link-selected' : ''}`}
					onClick={() => setCurrentLoc('/projects')}
				>
					Projets
				</NavLink>

				<NavLink
					to="/issuesProject"
					className={`topbar-menu-link ${currentLoc === '/issues' ? 'topbar-menu-link-selected' : ''}`}
					onClick={() => setCurrentLoc('/issues')}
				>
					Tickets
				</NavLink>
			</div>
			<div className="topbar-menu-settings">
				<NavLink to="/settings" onClick={() => setCurrentLoc('/settings')}>
					{currentUser.first_name} {currentUser.last_name}
				</NavLink>
			</div>
		</nav>
	);
};

export default TopBar;
