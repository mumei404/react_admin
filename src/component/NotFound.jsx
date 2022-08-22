import { Link } from 'react-router-dom';

export const NotFound = () => {
	return (
		<>
			<h1>404</h1>
			<Link to="/contact">Topへ戻る</Link>
		</>
	)
}
