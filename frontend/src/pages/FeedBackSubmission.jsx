import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const FeedBackSubmission = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [formData, setFormData] = useState({
    marks: 0,
    feedback: '',
  });
  const [message, setMessage] = useState('');

  // Fetch the submission details
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:2001/admin/getSubmission?id=${id}`);
        setSubmission(response.data);
        console.log(response.data);
        setFormData({
          marks: response.data.marksAwarded || 0,
          feedBack: response.data.feedBack|| '',
        });
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    fetchSubmission();
  }, [id]);

  console.log(submission);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveFeedback = async () => {
    if (!submission) {
      setMessage('No submission selected.');
      return;
    }

    try {
      await axios.put(`http://localhost:2001/admin/postAssignmentMarks?id=${submission.id}`, {
        ...formData,
      });
      setMessage('Feedback saved successfully!');
    } catch (error) {
      console.error('Error saving feedback:', error);
      setMessage('Failed to save feedback.');
    }
  };

  return (
    <Box>
      <AdminNavbar/>
    <Container  sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ display: 'flex', height: '90vh' }}>
        <Box sx={{ width: '60%', padding: 2, borderRight: '1px solid #e0e0e0', overflowY: 'auto' }}>
          <Typography variant="h5" gutterBottom>
            Student Submission
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          {submission ? (
            <Box sx={{ height: '100%', overflow: 'auto' }}>
              <Typography variant="subtitle1">
                Student ID: {submission.student_id}
              </Typography>
              <Typography variant="subtitle2">
                Submitted on: {new Date(submission.submittedOn).toLocaleString()}
              </Typography>

              <object
                data={`http://localhost:2000/file/getFile?name=${submission.filepath}`}
                type='application/pdf'
                width="100%"
                height="600px"
              >
                <p>Your browser does not support PDFs. 
                  <a href={`http://localhost:2000/file/getFile?name=${submission.filepath}`} target="_blank" rel="noopener noreferrer">Download PDF</a>
                </p>
              </object>
            </Box>
          ) : (
            <Typography variant="subtitle1" color="text.secondary">
              No submission available.
            </Typography>
          )}
        </Box>

        {/* Right Side: Feedback Form */}
        <Box sx={{ width: '60%', padding: 4 }}>
          <Typography variant="h5" gutterBottom>
            Feedback & Grading
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          {submission ? (
            <Box>
              <Typography variant="h6">Assignment ID: {submission.assignmentId}</Typography>
              <Box sx={{ marginTop: 3 }}>
                <TextField
                  fullWidth
                  label="Marks"
                  name="marks"
                  type="number"
                  value={formData.marks === -1 ? 0 : formData.marks}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2 }}
                  inputProps={{ min: 0, max: 10 }}
                  helperText="Marks should be between 0 and 10"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Comments"
                  name="feedBack"
                  value={formData.feedBack}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" onClick={handleSaveFeedback}>
                  Save Feedback
                </Button>
                {message && (
                  <Typography variant="body1" color="success.main" sx={{ marginTop: 2 }}>
                    {message}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Typography variant="subtitle1" color="text.secondary">
              No submission selected to provide feedback.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
    </Box>
  );
};

export default FeedBackSubmission;
