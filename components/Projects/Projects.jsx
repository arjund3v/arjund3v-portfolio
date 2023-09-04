'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaReact, FaPython, FaAws, FaSpotify, FaDatabase, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiC, SiExpress } from 'react-icons/si';
import { LuGithub } from 'react-icons/lu';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

import '@/styles/globals.css';
import './Projects.css';

const Projects = () => {
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
				stiffness: 230,
				delay: 0.2,
			},
		},
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
			<motion.div
				variants={fadeInAnimationVariants}
				initial="initial"
				whileInView="animate"
				viewport={{
					once: true,
				}}
				class="flex flex-col justify-center align-middle items-center text-center gap-14"
			>
				<div className="flex flex-col flex-wrap gap-5 justify-evenly align-baseline items-end md:flex-row md:w-4/5">
					<div className="card">
						<p className="card-title">Study.Me</p>
						<p className="small-desc">Study Me is a app powered by the OpenAI api allowing users to submit information and recieve study questions.</p>
						<div className="icons-container">
							<FaReact size={35} />
							<SiNextdotjs size={35} />
							<SiTailwindcss size={35} />
						</div>
						<div class="go-corner">
							<a
								href="https://github.com/arjund3v/Study-me"
								className="go-arrow"
							>
								→
							</a>
						</div>
						<div className="buttons-container">
							<a
								className="github-button noto"
								href="https://github.com/arjund3v/Study-me"
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
								href="https://study-me.vercel.app/"
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
					</div>
					<div className="card">
						<p className="card-title">Spotify ETL Pipeline</p>
						<p className="small-desc">A pipeline created in Python using the Pandas package to extract and load data into a AWS S3 Data Lake for further analysis.</p>
						<div className="icons-container">
							<FaPython size={35} />
							<FaAws size={35} />
							<FaSpotify size={35} />
						</div>
						<div className="go-corner">
							<a
								href="https://github.com/arjund3v/Spotify-ETL-Pipeline"
								className="go-arrow"
							>
								→
							</a>
						</div>
						<div className="buttons-container">
							<a
								className="github-button noto"
								href="https://github.com/arjund3v/Spotify-ETL-Pipeline"
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
								href="https://github.com/arjund3v/Spotify-ETL-Pipeline"
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
					</div>
					<div className="card">
						<p className="card-title">Store API</p>
						<p className="small-desc">An API created using ExpressJS + NodeJS, which takes a real world approach and focuses on filtering methods, query parameters, etc.</p>
						<div className="icons-container">
							<SiExpress size={35} />
							<FaNodeJs size={35} />
						</div>
						<div className="go-corner">
							<a
								href="https://github.com/arjund3v/store-api"
								className="go-arrow"
							>
								→
							</a>
						</div>
						<div className="buttons-container">
							<a
								className="github-button noto"
								href="https://github.com/arjund3v/store-api"
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
								href="https://github.com/arjund3v/store-api"
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
					</div>
					<div className="card">
						<p className="card-title">Patient Tracker</p>
						<p className="small-desc">A application created using C for hospital admins to register patients and manage admittance, utilizing a flat file database.</p>
						<div className="icons-container">
							<SiC size={35} />
							<FaDatabase size={35} />
						</div>
						<div className="go-corner">
							<a
								href="https://github.com/arjund3v/patient-tracker"
								className="go-arrow"
							>
								→
							</a>
						</div>
						<div className="buttons-container">
							<a
								className="github-button noto"
								href="https://github.com/arjund3v/patient-tracker"
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
								href="https://github.com/arjund3v/patient-tracker"
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
					</div>
					<div className="card">
						<p className="card-title">C Programs Archive</p>
						<p className="small-desc">A repository which contains a collection of mini-games, and small CLI programs created using the C programming language</p>
						<div className="icons-container">
							<SiC size={35} />
							<FaDatabase size={35} />
						</div>
						<div className="go-corner">
							<a
								href="https://github.com/arjund3v/C-Programs-Archive"
								className="go-arrow"
							>
								→
							</a>
						</div>
						<div className="buttons-container">
							<a
								className="github-button noto"
								href="https://github.com/arjund3v/C-Programs-Archive"
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
								href="https://github.com/arjund3v/C-Programs-Archive"
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
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default Projects;
