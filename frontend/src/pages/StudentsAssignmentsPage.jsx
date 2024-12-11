import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, Link } from '@mui/material';
import axios from 'axios';
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import StudentNavBar from '../components/StudentNavBar';
import { useNavigate } from 'react-router-dom';

const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const id = ls.get('id');
        const response = await axios.get(`http://localhost:2000/student/getAssignments?id=${id}`);
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const handleAssignmentSubmission = (assignmentId) => {
    navigate(`/submit-assignment/${assignmentId}`);
  };

  const handleTakeQuiz = (assignmentId) => {
    navigate(`/quiz/${assignmentId}`);
  };

  const handleViewAssignment = (assignmentId) => {
    navigate(`/student/view-assignment/${assignmentId}`);
  };

  return (
    <Box>
      <StudentNavBar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          View Assignments
        </Typography>
        <Grid container spacing={3}>
          {assignments.map((assignment) => (
            <Grid item xs={12} md={6} key={assignment.id}>
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

                {/* View Assignment Button */}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewAssignment(assignment.id)}
                  >
                    View Assignment
                  </Button>
                </Box>

                {/* Submit Assignment Button */}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAssignmentSubmission(assignment.id)}
                  >
                    Submit Assignment
                  </Button>
                </Box>

                {/* Quiz Button (if applicable) */}
                {assignment.quiz && (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleTakeQuiz(assignment.id)}
                    >
                      Take Quiz
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentAssignmentsPage;
