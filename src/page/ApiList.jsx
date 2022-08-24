import { fetchApiList } from '../api/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

const fetchData = async () => {
	/**
	本来はこう書く(api叩いて通信)が、モックにしたかったのでfetchApiList(sessionStorage)を使用
	const res = await fetch('https://jsonplaceholder.typicode.com/users')
	return res.json()
	*/
	const res = await fetchApiList();
	return res;
}

export const ApiList = () => {
	const { data, isLoading } = useQuery('apiList', fetchData, {cacheTime: 1000, staleTime: 1000})

	/**
	react-query使わない場合は、こうやって書く
	const [apiList, setApiList] = setState([])
	useEffect(() => {
		const init = async () => {
			// try catchが公式の推奨の書き方
			try {
				const result = await fetchApiList();
				setApiList(result);
			} catch(error) {
				console.log(error)
			}
		}
		init()
	}, []); // 第二引数が変化するたびuseEffectが発火する。今回は初回実行だけにしたいので[]指定
	*/

	return (
		<>
			<h1>API管理</h1>
			{
				isLoading ?
					<span>Loading.......</span>
				:
					data.length ?
						<table>
							<thead>
								<tr>
									<th>API名</th>
									<th>エンドポイント</th>
									<th>API型</th>
									<th>作成日時</th>
									<th>詳細</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item) => {
									return (
										<tr key={item.apiId}>
											<td>{item.apiName}</td>
											<td>{item.apiId}</td>
											<td>{item.apiType}</td>
											<td>12:03</td>
											<td><Link to={`/api-list/${item.apiId}`}>詳細</Link></td>
										</tr>
									)
								})}
							</tbody>
						</table>
						: '何もありません'
			}
		</>
	)
};
