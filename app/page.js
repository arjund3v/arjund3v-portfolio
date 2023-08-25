import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import Hero from '@/components/Hero/Hero';
import Details from '@/components/Details/Details';

export default function Home() {
	return (
		<main>
			<NavBar />
			<Hero />
			<Details />
		</main>
	);
}
