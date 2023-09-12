'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaReact, FaPython, FaAws, FaSpotify, FaDatabase, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiC, SiExpress } from 'react-icons/si';
import { LuGithub } from 'react-icons/lu';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { RiFileExcel2Fill } from 'react-icons/ri';

import '@/styles/globals.css';
import './Projects.css';

const projectData = [
	{
		title: 'Study.Me',
		description: 'Study Me is a app powered by the OpenAI api allowing users to submit information and receive study questions.',
		icons: [<FaReact size={35} />, <SiNextdotjs size={35} />, <SiTailwindcss size={35} />],
		githubLink: 'https://github.com/arjund3v/Study-me',
		liveDemoLink: 'https://study-me.vercel.app/',
	},
	{
		title: 'Customer List ETL Pipeline',
		description: 'A ETL pipeline created to demonstrate the use of data cleaning and ETL processes based off of a real life scenario and excel spreadsheet',
		icons: [<FaPython size={35} />, <RiFileExcel2Fill size={35} />],
		githubLink: 'https://github.com/arjund3v/Customer-List-ETL',
		liveDemoLink: 'https://github.com/arjund3v/Customer-List-ETL',
	},
	{
		title: 'Store API',
		description: 'An API created using ExpressJS + NodeJS, which takes a real-world approach and focuses on filtering methods, query parameters, etc.',
		icons: [<SiExpress size={35} />, <FaNodeJs size={35} />],
		githubLink: 'https://github.com/arjund3v/store-api',
		liveDemoLink: 'https://github.com/arjund3v/store-api',
	},
	{
		title: 'Patient Tracker',
		description: 'An application created using C for hospital admins to register patients and manage admittance, utilizing a flat file database.',
		icons: [<SiC size={35} />, <FaDatabase size={35} />],
		githubLink: 'https://github.com/arjund3v/patient-tracker',
		liveDemoLink: 'https://github.com/arjund3v/patient-tracker',
	},
	{
		title: 'C Programs Archive',
		description: 'A repository that contains a collection of mini-games and small CLI programs created using the C programming language.',
		icons: [<SiC size={35} />, <FaDatabase size={35} />],
		githubLink: 'https://github.com/arjund3v/C-Programs-Archive',
		liveDemoLink: 'https://github.com/arjund3v/C-Programs-Archive',
	},
];

const Projects = () => {
	const fadeInAnimationVariants = {
		initial: {
			opacity: 0,
			y: 100,
		},
		animate: (index) => ({
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 15,
				stiffness: 230,
				delay: 0.08 * index,
			},
		}),
	};

	return (
		<section
			className="projects bg-gray-100 flex flex-col justify-center items-center align-middle text-center gap-24"
			id="projects"
		>
			<div>
				<h3 className="noto-extra text-darkest text-lg my-2">PROJECTS</h3>
				<h2 className="text-5xl noto-extra">
					Many More Can Be Found On My{' '}
					<a
						className="text-darkest underline"
						href="https://github.com/arjund3v/"
					>
						GitHub!
					</a>
				</h2>
			</div>
			<div className="flex flex-col justify-center align-middle items-center text-center gap-14">
				<div className="flex flex-col flex-wrap gap-5 justify-center align-middle items-center md:flex-row md:w-3/4">
					{projectData.map((project, index) => (
						<motion.div
							className="card"
							key={index}
							variants={fadeInAnimationVariants}
							initial="initial"
							whileInView="animate"
							viewport={{
								once: true,
							}}
							custom={index}
						>
							<p className="card-title">{project.title}</p>
							<p className="small-desc">{project.description}</p>
							<div className="icons-container">
								{project.icons.map((icon, i) => (
									<React.Fragment key={i}>{icon}</React.Fragment>
								))}
							</div>
							<div className="go-corner">
								<a
									href={project.githubLink}
									className="go-arrow"
								>
									→
								</a>
							</div>
							<div className="buttons-container">
								<a
									className="github-button noto"
									href={project.githubLink}
								>
									GitHub
									<span>
										<LuGithub
											className="inline mx-1"
											size={20}
										/>
									</span>
								</a>
								<a
									className="live-demo noto"
									href={project.liveDemoLink}
								>
									Live Demo
									<span>
										<HiMiniArrowTopRightOnSquare
											className="inline mx-1"
											size={20}
										/>
									</span>
								</a>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
