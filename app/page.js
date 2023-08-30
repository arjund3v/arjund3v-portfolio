import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import Hero from '@/components/Hero/Hero';
import Details from '@/components/Details/Details';
import Projects from '@/components/Projects/Projects';

export default function Home() {
	return (
		<main>
			<NavBar />
			<Hero />
			<Details />
			<Projects />
		</main>
	);
}
