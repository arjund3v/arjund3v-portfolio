import React from 'react';

import '@/styles/globals.css';

const NavLinks = () => {
	return (
		<ul className="flex flex-row">
			<li>
				<a href="#home">Home</a>
			</li>
			<li>
				<a href="#details">Details</a>
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
	);
};

export default NavLinks;
