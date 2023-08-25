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
	);
};

export default Navigation;
