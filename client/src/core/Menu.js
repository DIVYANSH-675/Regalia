import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StoreIcon from '@material-ui/icons/Store';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900', textDecoration: 'none' };
  } else {
    return { color: '#ffffff', textDecoration: 'none' };
  }
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    display: 'block',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(1),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
  inputRoot: {
    color: theme.palette.common.black,
  },
  inputInput: {
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&:active': {
      backgroundColor: theme.palette.primary.dark,
    },
    marginRight: theme.spacing(1), // Increase the gap between items
  },
}));

const MaterialAppBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div style={{ backgroundColor: '#404040' }}>
        <MenuItem>
          <Link style={isActive(history, '/')} to='/'>
            Home
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={isActive(history, '/shop')} to='/shop'>
            Shop
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={isActive(history, '/cart')} to='/cart'>
            Cart
          </Link>
        </MenuItem>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <MenuItem>
            <Link
              style={isActive(history, '/user/dashboard')}
              to='/user/dashboard'
            >
              Dashboard
            </Link>
          </MenuItem>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <MenuItem>
            <Link
              style={isActive(history, '/admin/dashboard')}
              to='/admin/dashboard'
            >
              Dashboard
            </Link>
          </MenuItem>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <MenuItem>
              <Link style={isActive(history, '/signin')} to='/signin'>
                LogIn
              </Link>
            </MenuItem>

            <MenuItem>
              <Link style={isActive(history, '/signup')} to='/signup'>
                SignUp
              </Link>
            </MenuItem>
          </Fragment>
        )}

        {isAuthenticated() && (
          <MenuItem>
            <span
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              Signout
            </span>
          </MenuItem>
        )}
      </div>
    </Menu>
  );

  return (
    <AppBar position='fixed' style={{ backgroundColor: 'black', boxShadow: 'none' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <a href='/' style={{ color: '#ffffff' }}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='brand'
          >
            {/* <StoreIcon /> */}
          </IconButton>
        </a>
        <a href='/' className={classes.title}>
          <Typography variant='h6' noWrap>
            
          </Typography>
        </a>

        <div className={classes.sectionDesktop}>
          <Link style={isActive(history, '/')} to='/'>
            <IconButton aria-label='Home' color='inherit' className={classes.iconButton}>
              <Typography noWrap>Home</Typography>
            </IconButton>
          </Link>

          <Link style={isActive(history, '/shop')} to='/shop'>
            <IconButton aria-label='Shop' color='inherit' className={classes.iconButton}>
              <Typography noWrap>Shop</Typography>
            </IconButton>
          </Link>

          <Link style={isActive(history, '/cart')} to='/cart'>
            <IconButton aria-label='Cart' color='inherit' className={classes.iconButton}>
              <Typography noWrap>Cart</Typography>
            </IconButton>
          </Link>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Link
              style={isActive(history, '/user/dashboard')}
              to='/user/dashboard'
            >
              <IconButton aria-label='Dashboard' color='inherit' className={classes.iconButton}>
                <Typography noWrap>Dashboard</Typography>
              </IconButton>
            </Link>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Link
              style={isActive(history, '/admin/dashboard')}
              to='/admin/dashboard'
            >
              <IconButton aria-label='Dashboard' color='inherit' className={classes.iconButton}>
                <Typography noWrap>Dashboard</Typography>
              </IconButton>
            </Link>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <Link style={isActive(history, '/signin')} to='/signin'>
                <IconButton aria-label='Signin' color='inherit' className={classes.iconButton}>
                  <Typography noWrap>Signin</Typography>
                </IconButton>
              </Link>

              <Link style={isActive(history, '/signup')} to='/signup'>
                <IconButton aria-label='Signup' color='inherit' className={classes.iconButton}>
                  <Typography noWrap>Signup</Typography>
                </IconButton>
              </Link>
            </Fragment>
          )}

          {isAuthenticated() && (
            <span
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              <IconButton aria-label='Signout' color='inherit' className={classes.iconButton}>
                <Typography noWrap>Signout</Typography>
              </IconButton>
            </span>
          )}
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='inherit'
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};

export default withRouter(MaterialAppBar);
