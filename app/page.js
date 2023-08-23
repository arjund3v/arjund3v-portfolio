import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';

export default function Home() {
	return (
		<main>
			<NavBar />
			<Hero />
			<About />
		</main>
	);
}
