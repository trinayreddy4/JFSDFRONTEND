import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const StudentNavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
         <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            🏫
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate('/student/assignments')}>
            Assignments
          </Button>
          <Button color="inherit" onClick={() => navigate('/student/submit-assignments')}>
            Submissions
          </Button>
          <Button color="inherit" onClick={() => navigate('/')}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default StudentNavBar