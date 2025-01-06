import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, InputBase, Switch, useTheme, ThemeProvider } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../LogIn/UserContext'; 
import NewspaperIcon from '@mui/icons-material/Newspaper';

function ResponsiveAppBar({ toggleTheme, isDarkMode }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userData = JSON.parse(localStorage.getItem('user')) || null;
  const userName = userData ? userData.username : 'Usuario';

  return (
    <AppBar position="fixed" sx={{ background: 'linear-gradient(135deg,rgb(167, 147, 147),rgb(93, 189, 192))' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <NewspaperIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize="large" />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Noticias
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component={Link} to="/home" sx={{ color: 'white', marginRight: 2 }}>
              Inicio
            </Button>
            <Button component={Link} to="/favorites" sx={{ color: 'white', marginRight: 2 }}>
              Favoritos
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 1,
              paddingX: 1,
              marginRight: 2,
              width: { xs: '200px', md: '300px' },
            }}
          >
            <SearchIcon onClick={handleSearchSubmit} sx={{ cursor: 'pointer', color: '#757de8' }} />
            <InputBase
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown} 
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorElMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElMenu)}
            onClose={handleCloseMenu}
          >
            <MenuItem component={Link} to="/home" onClick={handleCloseMenu}>
              Inicio
            </MenuItem>
            <MenuItem component={Link} to="/favorites" onClick={handleCloseMenu}>
              Favoritos
            </MenuItem>
          </Menu>

          {/* Cambio de tema */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ color: 'white', marginRight: 2 }}>
              {userName}
            </Typography>
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme} // Alterna entre el modo claro y oscuro
              color="default"
            />
            <Tooltip title="Abrir configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => navigate('/profile')}>
                <Typography textAlign="center">Perfil</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Cerrar Sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
