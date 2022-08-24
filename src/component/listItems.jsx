import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { clearApiList, fetchApiList } from '../api/api';
import { useQuery } from 'react-query'

const fetchData = async () => {
	/**
	本来はこう書く(api叩いて通信)が、モックにしたかったのでfetchApiList(sessionStorage)を使用
	const res = await fetch('https://jsonplaceholder.typicode.com/users')
	return res.json()
	*/
	const res = await fetchApiList();
	return res;
}

export const ListItems = () => {
	const { data, isLoading } = useQuery('apiList', fetchData, {cacheTime: 1000, staleTime: 1000})
	return (
		<>
			<Link to="/">
				<ListItemButton>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItemButton>
			</Link>
			<Link to="/api-list">
				<ListItemButton>
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText primary="コンテンツ(API)" />
				</ListItemButton>
			</Link>
			{
				!isLoading &&
					data.map(item => {
						return (
							<Link key={item.apiId} to={`/api-list/${item.apiId}`}>
								<ListItemButton>
									<ListItemIcon>
									</ListItemIcon>
									<ListItemText primary={item.apiName} />
								</ListItemButton>
							</Link>
						)
					})
			}
			<Link to="/create-api">
				<ListItemButton>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="コンテンツ作成" />
				</ListItemButton>
			</Link>
			<hr />
			<span>debug mode</span>
			<ListItemButton onClick={clearApiList}>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="リセット ストレージ" />
			</ListItemButton>
		</>
	)
}
