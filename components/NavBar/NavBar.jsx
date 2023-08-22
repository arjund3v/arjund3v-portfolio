'use client';
import React from 'react';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

import './NavBar.css';

const NavBar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
		console.log('click');
	};

	return (
		<header className="h-16 relative">
			<div className="flex h-full w-full px-6">
				<div className="w-full mx-auto max-w-4xl">
					<div className="flex justify-between items-center h-full">
						<h3 className="text-xl font-bold md:text-2xl">
							<a href="#home">Arjun.dev</a>
						</h3>
						<nav>
							<ul className="hidden md:flex flex-row gap-5">
								<li>
									<a href="#">Home</a>
								</li>
								<li>
									<a href="#">Details</a>
								</li>
								<li>
									<a href="#">Projects</a>
								</li>
								<li>
									<a href="#">Experience</a>
								</li>
								<li>
									<a href="#">Contact</a>
								</li>
							</ul>
						</nav>
						{/* MOBILE NAVIGATION MENU */}
						<div className="md:hidden">
							<button
								className="md:hidden"
								onClick={() => toggleMobileMenu()}
							>
								{mobileMenuOpen ? <AiOutlineClose size={28} /> : <GiHamburgerMenu size={28} />}
							</button>
							<ul className={`${mobileMenuOpen ? 'mobile-menu-open' : 'hidden'}`}>
								<li>
									<a href="#">Home</a>
								</li>
								<li>
									<a href="#">Details</a>
								</li>
								<li>
									<a href="#">Projects</a>
								</li>
								<li>
									<a href="#">Experience</a>
								</li>
								<li>
									<a href="#">Contact</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default NavBar;
