'use client';
import React from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';

import '@/styles/globals.css';
import './NavBar.css';

const NavBar = () => {
	return (
		<header className="parent-container fixed top-0 h-16 w-full z-50 navbar-opacity">
			<div className="h-full w-full max-w-4xl flex justify-between items-center mx-auto">
				<h3 className="text-xl font-bold md:text-2xl">
					<a href="#home">Arjun.dev</a>
				</h3>
				<Navigation />
				<MobileNavigation />
			</div>
		</header>
	);
};

export default NavBar;
