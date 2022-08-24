import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

export const mainListItems = (
  <>
		<Link to="/">
			<ListItemButton>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItemButton>
		</Link>
		<Link to="/about">
			<ListItemButton>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="About" />
			</ListItemButton>
		</Link>
		<Link to="/contact">
			<ListItemButton>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Contact" />
			</ListItemButton>
		</Link>
		<Link to="/create-api">
			<ListItemButton>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Create API" />
			</ListItemButton>
		</Link>
  </>
);
