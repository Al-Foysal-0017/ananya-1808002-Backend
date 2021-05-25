import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from '../store/types/UserTypes';

import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactsIcon from '@material-ui/icons/Contacts';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));



const Navbar = () => {
	const { user } = useSelector((state) => state.AuthReducer);
	const dispatch = useDispatch();
	const logout = () => {
		localStorage.removeItem('myToken');
		dispatch({ type: LOGOUT });
	};
	const Links = user ? (
		<div className='navbar__right'>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/create'>Create Post</Link>
			</li>
			<li>
				<Link to='/dashboard/1'>{user.name}</Link>
			</li>
			<li>
				<span onClick={logout}>Logout</span>
			</li>
		</div>
	) : (
		<div className='navbar__right'>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
		</div>
	);

		//for material ui navbar
		const classes = useStyles();
		const theme = useTheme();
		const [open, setOpen] = React.useState(false);
		const handleDrawerOpen = () => {
		  setOpen(true);
		};
		const handleDrawerClose = () => {
		  setOpen(false);
		};
	 
		
	return (
		<>
		<div className="responsiveNavbarDesktop">
		<nav className='navbar'>
			<div className='container'>
				<div className='navbar__row'>
					<div className='navbar__left'>
						<Link to='/'>
							<img src='/images/logo.jpg' alt='' />
						</Link>
					</div>
					{Links}
				</div>
			</div>
		</nav>
		</div>


		<div className='responsiveNavbarMobile'>
			<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
				<Typography variant="h6" noWrap className={classes.title}>
				        <Link to='/'>
							<img div style={{width: "50px",borderRadius: "10px", margin:"8px"}} src='/images/logo.jpg' alt='' />
						</Link>
				</Typography>
				
						
				{user ?
				<>
				<Link to='/dashboard/1'><h2 style={{marginRight:"15px!important"}}>{user.name}</h2></Link>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="end"
					onClick={handleDrawerOpen}
					className={clsx(open && classes.hide)}
				>
					<MenuIcon fontSize="large" />
				</IconButton>
				</>
				:
				(
					<div className='navbar__right'>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/register'>Register</Link>
						</li>
					</div>
				)}
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="right"
				open={open}
				classes={{
				paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem>
					<ListItemIcon><HomeIcon fontSize="large"/></ListItemIcon>
					<ListItemText><Link to='/'><h2>Home</h2></Link></ListItemText>
					</ListItem>


					<ListItem>
					<ListItemIcon><NoteAddIcon fontSize="large"/></ListItemIcon>
					<ListItemText><Link to='/create'><h2>Create Post</h2></Link></ListItemText>
					</ListItem>

					<ListItem>
					<ListItemIcon><ContactsIcon fontSize="large"/></ListItemIcon>
					<ListItemText><Link to='/dashboard/1'><h2>My Blog</h2></Link></ListItemText>
					</ListItem>
				</List>

				<Divider />

				<List>
					<ListItem>
					<ListItemIcon><ExitToAppIcon fontSize="large"/></ListItemIcon>
					<ListItemText><h2 onClick={logout}>Logout</h2></ListItemText>
					</ListItem>
				</List>
			</Drawer>
			</div>
		</div>
		</>
	);
};
export default Navbar;
