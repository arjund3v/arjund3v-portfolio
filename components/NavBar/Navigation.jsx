import React from 'react';
import { FaDownload } from 'react-icons/fa';

const Navigation = () => {
	return (
		<nav className="hidden md:block">
			<ul className="flex flex-row gap-5 items-center">
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
				<li>
					<div className="flex">
						<a
							href="https://docs.google.com/document/d/1uj1V21J5fzKzFUWF19pe8ZVA7IrgrYaW/edit?usp=sharing&ouid=106400211148609699964&rtpof=true&sd=true"
							className=" bg-darkest rounded-lg text-white p-2"
						>
							<span className="flex flex-row w-auto gap-3 align-middle justify-start items-center">
								<p>Resume</p>
								<FaDownload
									size={13}
									className="inline-block"
								/>
							</span>
						</a>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
