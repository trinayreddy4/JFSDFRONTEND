import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  CircularProgress,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Download, Comment } from '@mui/icons-material';
import {Drawer,List, ListItem,ListItemText,Divider} from '@mui/material';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';  

const ViewSubmissions = () => {
  const { id } = useParams();
  const student_id = id || "NA";
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate();

  // Fetch submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`http://localhost:2001/admin/getStudentSubmissions/${student_id}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 5000);
    return () => clearInterval(interval);
  }, [student_id]);

  const handleViewFeedBack = (submissionId) => {
    navigate(`/admin/viewSubmission/${submissionId}`);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };


  const handleDownloadFile = async (filepath) => {
    try {
      const response = await axios.get( `http://localhost:2000/file/getFile?name=${filepath}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePath.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file", error);
    }
  };

  // Render loading spinner
  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      
    <Box sx={{ }}>

      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Grading System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={openDrawer} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => navigate('/admin/manage-users')}>
            <ListItemText primary="Manage Users" />
          </ListItem>
          <ListItem button onClick={() => navigate('/admin/assignments')}>
            <ListItemText primary="Manage Assignments" />
          </ListItem>
          <ListItem button onClick={() => navigate('/admin/viewSubmissions')}>
            <ListItemText primary="View Reports" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigate('/admin/settings')}>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      <Typography variant="h4" gutterBottom padding={4}>
        Submissions for Student ID: {student_id}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Student Submissions
            </Typography>
            <List>
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <ListItem key={submission.id} divider>
                    <ListItemText
                      primary={`Assignment: ${submission.assignmentId}`}
                      secondary={`Status: ${submission.marksAwarded === -1 ? "NOT GRADED" : "GRADED"}`}
                    />
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewFeedBack(submission.id)}
                      >
                        <Comment />
                      </IconButton>
                      <IconButton color="secondary" target='__blank' href={`http://localhost:2000/file/getFile?name=${submission.filepath}`}>
                          <Download />
                        </IconButton>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1">
                  No submissions found for this student.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Submission Guidelines
            </Typography>
            <Typography variant="body1">
              Please ensure that your assignments are submitted on time. Late submissions will be marked as
              "Delayed" and may affect your grades.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default ViewSubmissions;
