'use client';
import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

import '@/styles/globals.css';
import './Hero.css';

const Hero = () => {
	return (
		<section
			id="home"
			className="flex flex-row align-middle h-[80vh] relative overflow-hidden bg-gray-100 px-6"
		>
			<div className="bg-darkest top-28 right-[-20%] absolute -z-2 h-[100%] w-[50vw] rounded-[6rem] -rotate-[25deg] hidden lg:block" />
			<div className="flex flex-row justify-start w-full mx-auto max-w-4xl">
				<div className="flex flex-col justify-center align-middle gap-4 ">
					<h1 className="text-6xl noto-extra darkest">Hello, I'm Arjun.</h1>
					<h2 className="text-xl noto darkest">
						A 19 Year Old{' '}
						<span>
							<TypeAnimation
								className="text-xl noto darkest inline-block"
								sequence={[
									// Same substring at the start will only be typed out once, initially
									' Software Developer',
									1000, // wait 1s before replacing "Mice" with "Hamsters"
									' UI Designer',
									1000,
									' Student',
									1000,
								]}
								wrapper="span"
								speed={50}
								repeat={Infinity}
							/>
						</span>
					</h2>
					<div className="flex flex-row justify-start align-middle gap-7 mt-3">
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
			</div>
		</section>
	);
};

export default Hero;
