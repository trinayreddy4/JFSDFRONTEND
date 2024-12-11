import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {reactLocalStorage as ls} from 'reactjs-localstorage';
import StudentNavBar from '../components/StudentNavBar';
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(0);
  const [submissions, setSubmissions] = useState(0);
  const [studentName, setStudentName] = useState(ls.get("username"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with your actual API endpoints
        // const studentData = await axios.get('http://localhost:2003/student/details');
        console.log('http://localhost:2003/student/getAssignmentsCnt?id='+ls.get("id"));
        const assignmentData = await axios.get('http://localhost:2003/student/getAssignmentsCnt?id='+ls.get("id"));
        // const submissionData = await axios.get('http://localhost:2001/student/submissions');
        // console.log(assignmentData);
        // setStudentName(studentData.data.name);
        setAssignments(assignmentData.data);
        console.log(assignments);
        // setSubmissions(submissionData.data.pending);
      } catch (err) {
        console.error('Error fetching student dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      {/* Navbar */}
     
        <StudentNavBar/>
      {/* Dashboard Content */}
      <Box sx={{ padding: 3 }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Welcome, {studentName}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Assignments</Typography>
                <Typography variant="h4">{assignments}</Typography>
                <Button 
                  variant="outlined" 
                  sx={{ marginTop: 2 }}
                  onClick={() => navigate('/student/view-assignments')}
                >
                  View Assignments
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Pending Submissions</Typography>
                <Typography variant="h4">{submissions}</Typography>
                <Button 
                  variant="outlined" 
                  sx={{ marginTop: 2 }}
                  onClick={() => navigate('/student/submit-assignments')}
                >
                  Submit Assignments
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
