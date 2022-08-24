import { useParams } from 'react-router-dom'
import { fetchApiOne } from '../api/api'
import { fetchApiContentByApiId } from '../api/apiContent'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const fetchData = async (id) => {
	const res = await fetchApiOne(id);
	return res;
}

const fetchContent = async (id) => {
	const res = await fetchApiContentByApiId(id);
	return res;
}

export const ApiDetail = () => {
	const { id } = useParams();
	const { data, isLoading, isError } = useQuery('apiDetail', () => fetchData(id), {
		cacheTime: 1000,
		staleTime: 1000,
		retry: 1,
	})
	const apiContent = useQuery('apiContent', () => fetchContent(id), {
		cacheTime: 1000,
		staleTime: 1000,
		retry: 1,
	})

	return (
		<>
			<h1>API詳細</h1>
			<Link to={`/api-list/${id}/new`}>
				<button>作成</button>
			</Link>
			<br />
			{
				isLoading ?
					<span>Loading......</span>
				:
					isError ?
						<span>データが存在しません</span>
					:
						!apiContent.isLoading && apiContent.data.length ?
							<table>
								<thead>
									<tr>
										{data.schemaItems.map((item) => {
											return (
												<td key={item.fieldId}>{item.displayName}</td>
											)
										})}
									</tr>
								</thead>
								<tbody>
									{apiContent.data.map((item) => {
										return (
											<tr key={item.id}>
												{Object.keys(item).map((key => {
													return (
														<td>{item[key]}</td>
													)
												}))}
											</tr>
										)
									})}
								</tbody>
							</table>
							: '何もありません'

				/**
						{apiContent.data.length ?
							<table>
								<thead>
									<tr>
										{data.schemaItems.map(item => {
											return (
												<th key={item.fieldId}>{item.displayName}</th>
											)
										})}
									</tr>
								</thead>
								<tbody>
									{apiContent.data.map(item => {
										return (
											<tr key={item.title}>
												<td>{item.title}</td>
												<td>{item.body}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						:
							<span>中身がないので作成しよう</span>
						} */
			}
		</>
	)
}
