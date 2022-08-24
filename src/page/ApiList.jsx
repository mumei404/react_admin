import { fetchApiList } from '../api/api';
import { useEffect, useState } from 'react';
export const ApiList = () => {
	const [apiList, setApiList] = useState([]);

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

	return (
		<>
			<h1>API管理</h1>
			{
				apiList.length ?
				<table>
					<thead>
						<tr>
							<th>API名</th>
							<th>エンドポイント</th>
							<th>API型</th>
							<th>作成日時</th>
						</tr>
					</thead>
					<tbody>
						{apiList.map((item) => {
							return (
								<tr key={item.apiId}>
									<td>{item.apiName}</td>
									<td>{item.apiId}</td>
									<td>{item.apiType}</td>
									<td>12:03</td>
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
