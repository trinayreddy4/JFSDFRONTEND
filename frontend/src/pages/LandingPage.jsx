import React from 'react';
import { Container, Typography, Button, Box, Grid, CssBaseline, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1649770638560-b0011db12a76?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            Welcome to the Online Grading System
          </Typography>
          <Typography variant="h5" paragraph>
            Streamline grading, feedback, and academic performance tracking for both students and faculty.
          </Typography>
          <Button onClick={()=>navigate("/studentlogin")} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
            Student Login
          </Button>
          <Button onClick={()=>navigate("/facultylogin")} variant="contained" color="primary" sx={{ mt: 2 }}>
            Faculty Login
          </Button>
        </Container>
      </Box>

      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            About the System
          </Typography>
          <Typography variant="body1" paragraph>
            Our Online Grading System is designed to simplify the grading process for both students and faculty.
            Students can view their grades, submit assignments, and track their academic progress. Faculty can grade
            assignments, provide feedback, and manage student records, all in one place.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ padding: 4, backgroundColor: '#e0f7fa' }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  For Students
                </Typography>
                <Typography variant="body2">
                  - View your grades and academic performance<br />
                  - Submit assignments and track deadlines<br />
                  - Get real-time feedback from your professors
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  For Faculty
                </Typography>
                <Typography variant="body2">
                  - Grade assignments and provide feedback<br />
                  - Manage student profiles and performance<br />
                  - View detailed reports and analytics
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Easy to Use
                </Typography>
                <Typography variant="body2">
                  Our system is designed to be user-friendly, intuitive, and accessible from any device.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center', padding: 2 }}>
        <Typography variant="body2">
          © 2024 Online Grading System. All Rights Reserved.
        </Typography>
        <Divider />
        <Typography variant="body2">
          Contact: info@grading.com | Privacy Policy | Terms of Service
        </Typography>
      </Box>
    </>
  );
};

export default LandingPage;
