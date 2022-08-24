import { RouterConfig } from './route/Route';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()
function App() {
  return (
		<QueryClientProvider client={queryClient}>
			<div>
				<RouterConfig />
			</div>
		</QueryClientProvider>
  )
}

export default App
