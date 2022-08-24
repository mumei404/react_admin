import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About } from '../page/About';
import { Contact } from '../page/Contact';
import { Home } from '../page/Home';
import { CreateApi } from '../page/CreateApi';
import { NotFound } from '../page/NotFound';
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
						<Route path="/create-api" element={<CreateApi />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</>
	)
}
