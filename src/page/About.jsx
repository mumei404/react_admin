import { Link } from 'react-router-dom';

export const About = () => {
	return (
		<>
			<h1>About</h1>
			<Link to="/">home</Link>
			<br />
			<Link to="/contact">contact</Link>
		</>
	)
}
