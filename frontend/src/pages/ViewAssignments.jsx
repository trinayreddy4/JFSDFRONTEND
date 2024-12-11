import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import {reactLocalStorage as ls} from 'reactjs-localstorage';
import { useNavigate } from 'react-router-dom';

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const navigate = useNavigate();
  const id = ls.get("id");
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:2001/admin/getAssignmentsr?id='+id);
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setError('Failed to fetch assignments. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleView = (id) => {
    navigate(`/admin/viewAssignments/${id}`);
  };

  const handleDeleteClick = (id) => {
    setAssignmentToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    try {
      // Add delete API call logic here
      await axios.delete(`http://localhost:2001/admin/deleteAssignment/${assignmentToDelete}`);
      setAssignments(assignments.filter(assignment => assignment.id !== assignmentToDelete));
      setOpenDialog(false);
    } catch (error) {
      console.error('Error deleting assignment:', error);
      setError('Failed to delete assignment. Please try again later.');
      setOpenDialog(false);
    }
  };

  const handleAddSubmission = () => {
    navigate('/admin/createAssignment');  // Adjust the route to your add submission page
  };

  return (
    <Box>
      <AdminNavbar />
      <Box
        sx={{
          maxWidth: 800,
          margin: 'auto',
          mt: 5,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          View All Assignments
        </Typography>
        
        {/* Add Submission Button */}
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mb: 2 }} 
          onClick={handleAddSubmission}
        >
          Add Submission
        </Button>

        {isLoading ? (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Max Marks</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.length > 0 ? (
                  assignments.map((assignment, index) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{assignment.name}</TableCell>
                      <TableCell>{assignment.description}</TableCell>
                      <TableCell>{assignment.deadline}</TableCell>
                      <TableCell>{assignment.maxMarks}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleView(assignment.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteClick(assignment.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No assignments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Are you sure you want to delete this assignment?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewAssignments;
