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
							href="/Arjun_Saini_Resume.pdf"
							download="Arjun_Saini_Resume.pdf"
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
