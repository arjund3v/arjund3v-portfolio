import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import Hero from '@/components/Hero/Hero';

export default function Home() {
	return (
		<main>
			<NavBar />
			<Hero />
		</main>
	);
}
