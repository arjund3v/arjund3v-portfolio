'use client';
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ReactOriginal,
	JavascriptOriginal,
	NodejsOriginal,
	CplusplusPlain,
	ExpressOriginal,
	NextjsOriginal,
	TailwindcssPlain,
	MongodbOriginal,
	AmazonwebservicesOriginal,
	OracleOriginal,
	MysqlPlain,
} from 'devicons-react';

import '@/styles/globals.css';
import './Details.css';
import avatar from './avatar.jpg';

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
				<div className="flex flex-col gap-5 justify-center align-middle items-center text-center md:justify-start md:items-start md:align-top md:text-start md:w-1/2 md:gap-3 lg:w-1/2 lg:gap-3 xl:w-1/3">
					<h3 className="noto-extra text-darkest text-lg">DETAILS</h3>
					<h2 className="noto-extra text-2xl">A dedicated Junior Developer based in Toronto, ON 📍</h2>
					<p className="noto text-gray-500 text-sm">
						I am a 19-year-old student with a passion for web development. I specialize in front-end development and possess a solid understanding of basic back-end concepts. My enthusiasm extends to
						the realm of cloud technologies, particularly AWS, where I am eager to explore and leverage its capabilities. Additionally, I have a keen interest in data engineering, driven by a desire
						to understand how data flows and transforms within modern systems. My goal is to continue honing my skills in both web development and cloud technologies while pursuing opportunities to
						delve deeper into the world of data engineering.
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
				<div className="flex flex-col gap-5 justify-center align-middle items-center text-center md:justify-start md:items-start md:align-top md:text-start md:w-1/2 md:gap-3 lg:w-1/2 lg:gap-3 xl:w-1/3">
					<h3 className="noto-extra text-darkest text-lg">TECH STACK</h3>
					<h2 className="noto-extra text-2xl">My problem solving toolset 🛠️</h2>
					<div className="flex flex-wrap gap-5 justify-evenly py-5">
						<ReactOriginal
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<JavascriptOriginal
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<NodejsOriginal
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<CplusplusPlain
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<ExpressOriginal
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<NextjsOriginal
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<TailwindcssPlain
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<MongodbOriginal
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<AmazonwebservicesOriginal
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<OracleOriginal
							size={55}
							className="stack-icon shadow-xl p-1"
						/>
						<MysqlPlain
							size={55}
							className="stack-icon shadow-xl"
						/>
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default Details;
