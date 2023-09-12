import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import Hero from '@/components/Hero/Hero';
import Details from '@/components/Details/Details';
import Projects from '@/components/Projects/Projects';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
	return (
		<main>
			<NavBar />
			<Hero />
			<Details />
			<Projects />
			<Contact />
			<Footer />
		</main>
	);
}
