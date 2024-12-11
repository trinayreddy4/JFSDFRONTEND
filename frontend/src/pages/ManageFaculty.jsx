import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Button, 
  IconButton, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', address: '' });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get('http://localhost:2001/admin/getAllFaculties');
        setFaculty(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFaculty();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/admin/deleteFaculty/${id}`);
      setFaculty(faculty.filter((f) => f.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    setFormData({ id: '', name: '', email: '', address: '' });
    setIsEdit(false);
    setDialogOpen(true);
  };

  const handleEdit = (id) => {
    const facultyToEdit = faculty.find((f) => f.id === id);
    if (facultyToEdit) {
      setFormData(facultyToEdit);
      setIsEdit(true);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({ id: '', name: '', email: '', address: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:2001/admin/updateFaculty/${formData.id}`, formData);
        setFaculty(faculty.map((f) => (f.id === formData.id ? formData : f)));
      } else {
        await axios.post('http://localhost:2001/admin/addFaculty', formData);
        setFaculty([...faculty, formData]);
      }
      setDialogOpen(false);
      setFormData({ id: '', name: '', email: '', address: '' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
        <AdminNavbar/>
    <Box sx={{ width: '100vw', height: '100vh', padding: 3 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Manage Faculty
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <TextField
            label="Search Faculty"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearch}
            sx={{ width: '300px' }}
          />
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={handleAdd}
          >
            Add Faculty
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faculty
                .filter((f) => 
                  f.name.toLowerCase().includes(search.toLowerCase()) ||
                  f.email.toLowerCase().includes(search.toLowerCase()) ||
                  f.address.toLowerCase().includes(search.toLowerCase())
                )
                .map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>{f.id}</TableCell>
                    <TableCell>{f.name}</TableCell>
                    <TableCell>{f.email}</TableCell>
                    <TableCell>{f.address}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(f.id)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(f.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog for Add/Edit Faculty */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{isEdit ? 'Edit Faculty' : 'Add Faculty'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Faculty ID"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              disabled={isEdit}
              fullWidth
              margin="dense"
              variant="outlined"
            />
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
              variant="outlined"
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {isEdit ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
    </Box>
  );
};

export default ManageFaculty;
