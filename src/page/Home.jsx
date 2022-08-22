import { Link } from 'react-router-dom';

export const Home = () => {
	return (
		<>
			<h1>Home</h1>
			<Link to="/contact">contact</Link>
			<br />
			<Link to="/about">about</Link>
		</>
	)
}
