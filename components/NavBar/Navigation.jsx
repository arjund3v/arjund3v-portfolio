import React from 'react';

const Navigation = () => {
	return (
		<nav className="hidden md:block">
			<ul className="flex flex-row gap-5">
				<li>
					<a href="#home">Home</a>
				</li>
				<li>
					<a href="#details">Details</a>
				</li>
				<li>
					<a href="#projects">Projects</a>
				</li>
				<li>
					<a href="#contact">Contact</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
