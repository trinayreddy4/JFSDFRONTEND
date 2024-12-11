import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Button, TextField, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import { useNavigate, useParams } from 'react-router-dom';
import StudentNavBar from '../components/StudentNavBar';

const SubmitAssignmentPage = () => {
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve the assignment ID from the URL

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/student/getAssignment?id=${id}`);
        setAssignment(response.data);
      } catch (error) {
        console.error('Error fetching assignment details:', error);
        setError('Failed to load assignment details');
      }
    };

    fetchAssignment();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to submit.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignmentId', id);
    formData.append('studentId', ls.get('id'));

    try {
      const response = await axios.post('http://localhost:2000/student/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      if (response.data === 'Success') {
        navigate('/assignments');
      } else {
        setError('Failed to submit the assignment');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      setLoading(false);
      setError('Failed to submit the assignment');
    }
  };

  return (
    <Box>
      <StudentNavBar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Submit Assignment
        </Typography>

        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        {assignment ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {assignment.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {assignment.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Max Marks:</strong> {assignment.maxMarks}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Upload Your Assignment
                </Typography>

                <TextField
                  type="file"
                  fullWidth
                  onChange={handleFileChange}
                  variant="outlined"
                  margin="normal"
                />
                
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Submit Assignment'}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" align="center">
            Loading assignment details...
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default SubmitAssignmentPage;
