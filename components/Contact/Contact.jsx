import React from 'react';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';

import '@/styles/globals.css';
import './Contact.css';

const Contact = () => {
	return (
		<section
			id="contact"
			className="contact flex flex-col text-center gap-10"
		>
			<div>
				<h3 className="noto-extra text-darkest text-lg my-2">CONTACT ME</h3>
				<h2 className="text-5xl noto-extra">I Don't Bite, Contact Me!</h2>
			</div>
			<div className="flex flex-col justify-center align-middle gap-14 md:flex-row md:gap-32">
				<div className="flex flex-col gap-3 justify-center items-center md:flex-row md:align-middle">
					<a href="https://www.google.com/maps/place/Toronto,+ON/@43.7170413,-80.0018981,10z/data=!3m1!4b1!4m6!3m5!1s0x89d4cb90d7c63ba5:0x323555502ab4c477!8m2!3d43.653226!4d-79.3831843!16zL20vMGg3aDY?entry=ttu">
						<HiOutlineLocationMarker
							size={30}
							className="icon"
						/>
					</a>
					<div className="flex flex-col text-center md:text-left">
						<h3 className="noto-extra text-darkest text-base">LOCATION</h3>
						<p>Toronto, ON</p>
					</div>
				</div>
				<div className="flex flex-col gap-3 justify-center items-center md:flex-row md:align-middle">
					<a href="mailto:arjuns1026@gmail.com">
						<HiOutlineMail
							size={30}
							className="icon"
						/>
					</a>
					<div className="flex flex-col text-center md:text-left">
						<h3 className="noto-extra text-darkest text-base">EMAIL</h3>
						<p>Arjuns1026@gmail.com</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
