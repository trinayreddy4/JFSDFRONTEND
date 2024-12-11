import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import { reactLocalStorage as ls } from 'reactjs-localstorage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(0);
  const [assignments, setAssignmentsCount] = useState(0);
  const [submissions, setSubmissions] = useState(0);
  const [faculty, setFaculty] = useState(0);
  const [id, setId] = useState(ls.get("id"));
  const [name, setName] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`http://localhost:2001/admin/getStudentCountr?id=${id}`);
        setStudents(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    const loadAssignments = async () => {
      try {
        const res = await axios.get(`http://localhost:2001/admin/getAssignmentCountr?id=${id}`);
        setAssignmentsCount(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    const loadSubmissions = async () => {
      try {
        const res = await axios.get('http://localhost:2001/admin/getSubmissionsPendingCount');
        setSubmissions(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    const loadFacultyDetails = async () => {
      try {
        const res = await axios.get('http://localhost:2001/admin/getFacultyCount');
        setFaculty(res.data);

        const facName = await axios.get(`http://localhost:2001/admin/getFacultyDetails?id=${id}`);
        setName(facName.data.name);
      } catch (e) {
        console.error(e);
      }
    };

    load();
    loadAssignments();
    loadSubmissions();
    loadFacultyDetails();

    const interval = setInterval(() => {
      load();
      loadAssignments();
      loadSubmissions();
      loadFacultyDetails();
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <AdminNavbar />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Container>
            <Typography variant="h4" gutterBottom>
              Welcome, {name}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Total Students
                  </Typography>
                  <Typography variant="h4">{students}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/manage-users')}
                    sx={{ marginTop: 2 }}
                  >
                    View Users
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Posted Assignments
                  </Typography>
                  <Typography variant="h4">{assignments}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/viewAssignments')}
                    sx={{ marginTop: 2 }}
                  >
                    Manage Assignments
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Grading Pending
                  </Typography>
                  <Typography variant="h4">{submissions}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/viewSubmissions')}
                    sx={{ marginTop: 2 }}
                  >
                    View Submissions
                  </Button>
                </Paper>
              </Grid>
              {id == 1 && (
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Faculty Members
                    </Typography>
                    <Typography variant="h4">{faculty}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/manage-faculty')}
                      sx={{ marginTop: 2 }}
                    >
                      Manage Faculty
                    </Button>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
