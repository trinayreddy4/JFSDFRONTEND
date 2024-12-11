import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab'; 
import AdminNavbar from '../components/AdminNavbar';
import {reactLocalStorage as ls} from 'reactjs-localstorage';
import axios from 'axios';

const AssignmentCreationPage = () => {
  const [assignment, setAssignment] = useState({
    name: '',
    deadline: '',
    description: '',
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAssignment((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    assignment.deadline = assignment.deadline.split("T")[0]; // Format date
    
    try {
      const formData = new FormData();
      formData.append('name', assignment.name);
      formData.append('deadline', assignment.deadline);
      formData.append('description', assignment.description);
      formData.append('faculty_id',ls.get("id"));
      if (assignment.file) {
        formData.append('file', assignment.file); 
      }

      const res = await axios.post(
        'http://localhost:2001/admin/createAssignment',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      alert('Assignment created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create assignment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <AdminNavbar />
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" gutterBottom>Create New Assignment</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={assignment.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Deadline"
            name="deadline"
            type="datetime-local"
            value={assignment.deadline}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Description"
            name="description"
            value={assignment.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <LoadingButton
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 2 }}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </LoadingButton>
          {assignment.file && (
            <Typography variant="body2" color="textSecondary">
              Uploaded File: {assignment.file.name}
            </Typography>
          )}
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            loading={isLoading}
            sx={{ mt: 3 }}
            disabled={!assignment.file} 
          >
            Create Assignment
          </LoadingButton>
        </form>
      </Box>
    </Box>
  );
};

export default AssignmentCreationPage;
