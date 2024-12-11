import React, { useState } from 'react';
import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear the username or session token
    navigate('/login'); // Redirect to the login page
  };

  const menuItems = [
    { text: 'Manage Users', path: '/admin/manage-users' },
    { text: 'Manage Assignments', path: '/admin/viewAssignments' },
    { text: 'View Submissions', path: '/admin/viewSubmissions' },
    { text: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => navigate('/admin/')}
              sx={{
                fontSize: '20px',
                color: 'white',
                textTransform: 'none',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Admin Dashboard
            </Button>
          </Typography>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="secondary"
            sx={{
              textTransform: 'none',
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#b71c1c',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={openDrawer} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                toggleDrawer();
              }}
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 255, 0.1)' : 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 255, 0.2)',
                },
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  style: {
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  },
                }}
              />
            </ListItem>
          ))}
          <Divider />
        </List>
      </Drawer>
    </div>
  );
};

export default AdminNavbar;
