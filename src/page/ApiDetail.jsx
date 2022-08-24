import { useParams } from 'react-router-dom'
import { fetchApiOne } from '../api/api'
import { useQuery } from 'react-query'

const fetchData = async (id) => {
	const res = await fetchApiOne(id);
	return res;
}

export const ApiDetail = () => {
	const { id } = useParams();
	const { data, isLoading, isError } = useQuery('apiDetail', () => fetchData(id), {
		cacheTime: 1000,
		staleTime: 1000,
		retry: 1,
	})

	return (
		<>
			<h1>API詳細</h1>
			{
				isLoading ?
					<span>Loading......</span>
				:
					isError ?
						<span>データが存在しません</span>
					:
						data.apiName
			}
		</>
	)
}
