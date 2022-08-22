import { Link } from 'react-router-dom';

export const Home = () => {
	return (
		<>
			<h1>Home</h1>
			<Link to="/about">about</Link>
			<br />
			<Link to="/contact">contact</Link>
		</>
	)
}
