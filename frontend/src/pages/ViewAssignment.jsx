import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const ViewAssignment = () => {
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');  // Added error state

  const { id } = useParams(); // Correct way to extract 'id' from the URL
  
  useEffect(() => {
    const fetchAssignment = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:2000/admin/getAssignmentById?id=${id}`);
        setAssignment(response.data);
        setFileUrl(response.data.filePath);
      } catch (error) {
        setError('Failed to fetch assignment details');  // Set error message if fetching fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.put(`http://localhost:2001/admin/updateAssignment`, assignment);
      alert('Assignment updated successfully');
    } catch (error) {
      alert('Failed to update assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Typography>Loading assignment details...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;  // Display error message
  }

  if (!assignment) {
    return <Typography>No assignment found with this ID.</Typography>;
  }

  return (
    <Box>
      <AdminNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Assignment
        </Typography>

        <TextField
          label="Assignment Name"
          variant="outlined"
          fullWidth
          value={assignment.name}
          onChange={(e) => setAssignment({ ...assignment, name: e.target.value })}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Deadline"
          variant="outlined"
          fullWidth
          value={assignment.deadline}
          onChange={(e) => setAssignment({ ...assignment, deadline: e.target.value })}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Max Marks"
          variant="outlined"
          fullWidth
          value={assignment.maxMarks}
          onChange={(e) => setAssignment({ ...assignment, maxMarks: e.target.value })}
          sx={{ marginBottom: 2 }}
        />

        {fileUrl && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => window.open(`http://localhost:2004/file/getFile?name=${fileUrl}`, '_blank')}
            sx={{ marginBottom: 2 }}
          >
            View Assignment File (PDF)
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Assignment'}
        </Button>
      </Box>
    </Box>
  );
};

export default ViewAssignment;
