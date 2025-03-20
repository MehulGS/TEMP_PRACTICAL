import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../redux/actions/authActions'; 

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '15px' }}>E-Commerce App</Link>
        </Typography>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '15px' }}>
          Home
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', marginRight: '15px' }}>
              Login
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'inherit', marginRight: '15px' }}>
              Register
            </Link>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout} sx={{ marginRight: '15px' }}>
            Logout
          </Button>
        )}
        <Link to="/checkout" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton color="inherit">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
