import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

import '@/styles/globals.css';
import './Footer.css';

const Footer = () => {
	return (
		<footer
			id="footer"
			className="footer bg-gray-100"
		>
			<div className="flex flex-col justify-between items-center text-center gap-5 md:flex-row md:mx-12 md:px-12">
				<h3 className="noto">Copyright © 2023. All rights are reserved</h3>
				<div className="flex flex-row gap-3">
					<a href="https://github.com/arjund3v">
						<FaGithub
							size={28}
							className=" cursor-pointer hover:text-darkest transition-all"
						/>
					</a>
					<a href="https://www.linkedin.com/in/arjund3v/">
						<FaLinkedin
							size={28}
							className=" cursor-pointer hover:text-darkest transition-all"
						/>
					</a>
					<a href="mailto:arjuns1026@gmail.com">
						<FaEnvelope
							size={28}
							className=" cursor-pointer hover:text-darkest transition-all"
						/>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
