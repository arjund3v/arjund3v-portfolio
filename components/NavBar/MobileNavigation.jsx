'use client';
import React, { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const MobileNavigation = () => {
	const [isOpen, setOpen] = useState(false);

	const dropDownVariants = {
		hidden: {
			opacity: 0,
			y: '-100%',
		},
		visible: {
			opacity: 1,
			y: '0%',
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 120,
			},
		},
		exit: {
			opacity: 0,
			y: '-100%',
			transition: {
				ease: 'easeOut', // Use easeOut for smoother exit
				duration: 0.5,
			},
		},
		link: {
			hidden: { opacity: 0, y: -10 },
			visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
		},
	};

	const linkClick = () => {
		setOpen(false);
	};

	return (
		<nav className="md:hidden">
			{/* This is for the hamburger icon */}
			<Hamburger
				toggled={isOpen}
				toggle={setOpen}
			/>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						variants={dropDownVariants}
						initial="hidden"
						animate={isOpen ? 'visible' : 'hidden'}
						exit="exit"
						className={`${isOpen ? 'pt-24 pl-8 gap-10 fixed top-16 left-0 w-full h-full bg-white z-50 flex flex-col justify-start' : 'hidden'}`}
					>
						<li>
							<motion.a
								href="#home"
								onClick={linkClick}
								className="text-3xl noto-bold"
							>
								Home
							</motion.a>
						</li>
						<li>
							<motion.a
								href="#details"
								onClick={linkClick}
								className="text-3xl noto-bold"
							>
								Details
							</motion.a>
						</li>
						<li>
							<a
								href="#projects"
								onClick={linkClick}
								className="text-3xl noto-bold"
							>
								Projects
							</a>
						</li>
						<li>
							<motion.a
								href="#contact"
								onClick={linkClick}
								className="text-3xl noto-bold"
							>
								Contact
							</motion.a>
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
					</motion.ul>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default MobileNavigation;
