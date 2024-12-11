import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StudentNavBar from '../components/StudentNavBar';

const ViewAssignmentPage = () => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();  // To get the assignment ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the single assignment based on its ID
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/student/getAssignment?id=${id}`);
        setAssignment(response.data);
      } catch (error) {
        console.error('Error fetching assignment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleDownloadFile = () => {
    if (assignment?.filePath) {
      window.location.href = `http://localhost:2000/file/download/${assignment.filePath}`;  // Update the endpoint as needed
    }
  };

  return (
    <Box>
        <StudentNavBar/>
    <Container>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
            Assignment Details
          </Typography>

          {assignment && (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {assignment.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  <strong>Description:</strong> {assignment.description}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  <strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  <strong>Max Marks:</strong> {assignment.maxMarks}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  {assignment.filePath && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDownloadFile}
                    >
                      Download Assignment File
                    </Button>
                  )}
                </Box>

                {/* For quiz-based assignments */}
                {assignment.quiz && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Quiz Assignment
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate(`/quiz/${assignment.id}`)}  // Navigate to quiz page if available
                    >
                      Take Quiz
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Container>
    </Box>
  );
};

export default ViewAssignmentPage;
