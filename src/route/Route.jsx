import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About } from '../component/About';
import { Contact } from '../component/Contact';
import { Home } from '../component/Home';
import { NotFound } from '../component/NotFound';
import { Layout } from '../component/Layout';

export const RouterConfig = () => {
	return (
		<>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</>
	)
}
