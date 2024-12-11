import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { reactLocalStorage as ls } from 'reactjs-localstorage';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    mobileNo: '',
    location: '',
    faculty_id: '',
  });
  const [facultyid, setFacultyId] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setFacultyId(JSON.parse(JSON.stringify(ls.get('id', 1))));
    const load = async () => {
      try {
        const response = await axios.get(`http://localhost:2001/admin/getStudent?id=${ls.get('id')}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const loadFaculties = async () => {
      try {
        const response = await axios.get('http://localhost:2001/admin/getAllFaculties');
        setFaculties(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    load();
    loadFaculties();

    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    setFormData(user || { name: '', gender: '', email: '', mobileNo: '', location: '', faculty_id: '' });
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.mobileNo) {
      newErrors.mobileNo = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Mobile number must be 10 digits.';
    }
    if (!formData.location) newErrors.location = 'Location is required.';
    if (!formData.faculty_id) newErrors.faculty_id = 'Faculty ID is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFacultyChange = (e) => {
    console.log(e);
    const selectedFacultyId = e.target.value;
    setFacultyId(selectedFacultyId);
    setFormData({ ...formData, faculty_id: selectedFacultyId });
  };

  const handleSaveUser = async () => {
    if (!validateForm()) return;

    try {
      if (selectedUser) {
        // Update user
        await axios.put(`http://localhost:2001/admin/updateStudent?id=${selectedUser.student_id}`, formData);
        setUsers(users.map((user) => (user.student_id === selectedUser.student_id ? { ...user, ...formData } : user)));
      } else {
        // Add new student
        console.log(formData);
        const response = await axios.post('http://localhost:2001/admin/addStudent', formData);
        setUsers([...users, response.data]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (student_id) => {
    try {
      await axios.delete(`http://localhost:2001/admin/deleteStudent?id=${student_id}`);
      setUsers(users.filter((user) => user.student_id !== student_id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleViewSubmission = (user) => {
    navigate(`/admin/viewSubmissions/${user.student_id}`);
  };

  return (
    <Box>
      <AdminNavbar />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manage Students
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
            Add Student
          </Button>
        </Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>View Submissions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.student_id}>
                    <TableCell>{user.student_id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => handleViewSubmission(user)} variant="contained">
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenDialog(user)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteUser(user.student_id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedUser ? 'Edit Student' : 'Add Student'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <FormControl component="fieldset" sx={{ marginTop: 2 }} error={!!errors.gender}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
              {errors.gender && <Typography color="error">{errors.gender}</Typography>}
            </FormControl>
            <TextField
              margin="dense"
              label="Mobile No"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.mobileNo}
              helperText={errors.mobileNo}
            />
            <TextField
              margin="dense"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.location}
              helperText={errors.location}
            />
            <FormControl fullWidth margin="dense" error={!!errors.faculty_id}>
              <FormLabel>Faculty ID</FormLabel>
              <select
                name="faculty_id"
                value={formData.faculty_id || facultyid || '1'}
                onChange={handleFacultyChange}
                displayEmpty
              >
                <option value="0">Select Faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
              {errors.faculty_id && <Typography color="error">{errors.faculty_id}</Typography>}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveUser}>
              {selectedUser ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ManageUsers;
