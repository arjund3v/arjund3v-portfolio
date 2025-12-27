'use client';
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import '@/styles/globals.css';
import './Details.css';

const techStack = [
	{
		name: 'React',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
	},
	{
		name: 'JavaScript',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png',
	},
	{
		name: 'TypeScript',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/960px-Typescript_logo_2020.svg.png',
	},
	{
		name: 'C',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1086px-C_Programming_Language.svg.png',
	},
	{
		name: 'C++',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/330px-ISO_C%2B%2B_Logo.svg.png',
	},
	{
		name: 'Node.js',
		src: 'https://images.seeklogo.com/logo-png/27/1/node-js-logo-png_seeklogo-273749.png',
	},

	{ name: 'Express', src: 'https://cdn.worldvectorlogo.com/logos/expressjs.svg' },
	{ name: 'Next.js', src: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
	{
		name: 'Tailwind',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png',
	},
	{
		name: 'MongoDB',
		src: 'https://icon-icons.com/download-file?file=https%3A%2F%2Fimages.icon-icons.com%2F2415%2FPNG%2F512%2Fmongodb_original_wordmark_logo_icon_146425.png&id=146425&pack_or_individual=pack',
	},
	{
		name: 'AWS',
		src: 'https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png',
	},
	{
		name: 'Azure',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/2048px-Microsoft_Azure.svg.png',
	},
	{
		name: 'InTune',
		src: 'https://img.icons8.com/color/1200/microsoft-intune.jpg',
	},
	{ name: 'MySQL', src: 'https://1000logos.net/wp-content/uploads/2020/08/MySQL-Logo.png' },
	{
		name: 'Matlab',
		src: 'https://www.mathworks.com/company/technical-articles/the-mathworks-logo-is-an-eigenfunction-of-the-wave-equation/_jcr_content/mainParsys/image_2.adapt.full.medium.gif/1744712359615.gif',
	},
	{
		name: 'Packet Tracer',
		src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD1_tY_mXnWLucJFIB8A6VgBapHvRKjH9Z8A&s',
	},
	{
		name: 'Java',
		src: 'https://1000logos.net/wp-content/uploads/2020/09/Java-Logo.png',
	},
	{
		name: 'Python',
		src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdgUkYVq9-UPHtkrQyNzA1t-hCdSG65-XYw&s',
	},
	{
		name: 'Pandas',
		src: 'https://miro.medium.com/0*RWkQ0Fziw792xa0S',
	},
	{
		name: 'Docker',
		src: 'https://img.icons8.com/fluent/1200/docker.jpg',
	},
	{
		name: 'PostgreSQL',
		src: 'https://images.g2crowd.com/uploads/product/image/251be2af3ae607c45c14e816eaa1cf41/postgresql.png',
	},
	{
		name: 'REST API',
		src: 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/rest-api-icon.png',
	},
	{
		name: 'Linux',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/330px-Tux.svg.png',
	},
	{
		name: 'Postman',
		src: 'https://yt3.googleusercontent.com/XRzDTgEa9GybH_Uk21E9ri6_iYh-9gbyZzhiEBCnLjISgjTorjMiu7IwpChUMf2lLpEdX6ufDA=s900-c-k-c0x00ffffff-no-rj',
	},
	{
		name: 'Git',
		src: 'https://avatars.githubusercontent.com/u/18133?s=280&v=4',
	},
];

const TechCard = ({ name, src }) => (
	<div className="group relative overflow-hidden rounded-md my-2 mx-1 bg-white ">
		<img
			src={src}
			alt={name}
			className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-110"
		/>
		<div className="absolute inset-0 bg-blue-950 bg-opacity-100 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
			<span className="text-white text-md font-semibold text-center">{name}</span>
		</div>
	</div>
);

const Details = () => {
	const fadeInAnimationVariants = {
		initial: {
			opacity: 0,
			y: 100,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 15,
				stiffness: 150,
			},
		},
	};
	return (
		<section
			id="details"
			className="details flex flex-col gap-24"
		>
			{/* Main Details */}
			<motion.div
				variants={fadeInAnimationVariants}
				initial="initial"
				whileInView="animate"
				viewport={{
					once: true,
				}}
				className="flex flex-col justify-center align-middle items-center text-center gap-3 md:flex-row md:gap-5 lg:gap-10"
			>
				<div className="avatar" />
				<div className="flex flex-col gap-5 justify-center align-middle items-center text-center md:justify-start md:items-start md:align-top md:text-start md:w-1/2 md:gap-3 lg:w-8/12 lg:gap-3 xl:w-1/2">
					<h3 className="noto-extra text-darkest text-lg">DETAILS</h3>
					<h2 className="noto-extra text-3xl">
						A dedicated Junior Developer based in Toronto, ON 📍
					</h2>
					<p className="noto text-gray-500 text-lg">
						I am a 21-year-old student with a strong passion for computer networking and
						infrastructure. I am particularly interested in how networks are designed, secured, and
						optimized to support modern applications and cloud-based systems. Alongside my
						networking focus, I have experience in front-end development and a solid understanding
						of fundamental back-end concepts, which helps me understand how applications interact
						with underlying network services.
					</p>
				</div>
			</motion.div>
			{/* Tech Stack Details */}
			<motion.div
				variants={fadeInAnimationVariants}
				initial="initial"
				whileInView="animate"
				viewport={{
					once: true,
				}}
				className="flex flex-col justify-center align-middle items-center text-center gap-3 md:flex-row md:items-start md:gap-5 lg:gap-10"
			>
				<div className="swe" />
				<div className="flex flex-col gap-5 justify-center align-middle items-center text-center md:justify-start md:items-start md:align-top md:text-start md:w-1/2 md:gap-3 lg:w-8/12 lg:gap-3 xl:w-1/2">
					<h3 className="noto-extra text-darkest text-lg">TECH STACK</h3>
					<h2 className="noto-extra text-3xl">My problem solving toolset 🛠️</h2>
					<div className="py-5 w-[100%]">
						<ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 5, 900: 4, 1024: 6 }}>
							<Masonry gutter="18px">
								{techStack.map((tech) => (
									<TechCard
										key={tech.name}
										{...tech}
									/>
								))}
							</Masonry>
						</ResponsiveMasonry>
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default Details;
