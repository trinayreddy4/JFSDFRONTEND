import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Search, Comment, Download, CheckCircle, Error } from '@mui/icons-material';
import {Drawer,List, ListItem,ListItemText,Divider} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleViewSubmission = (s)=>{
    navigate(`/admin/viewSubmission/${s.id}`)
  }

  

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:2000/admin/getAllSubmissions');
        setSubmissions(response.data);
        setFilteredSubmissions(response.data); 
      } catch (error) {
        console.error("Error fetching submissions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions,5000);
    return ()=>clearInterval(interval);
  }, []);
  // console.log(submissions);
  const handleFilterChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    console.log(searchQuery);
    setFilter(searchQuery);
    const filteredData = submissions.filter(submission => 
      submission.student_id==searchQuery ||
      submission.assignmentId.toLowerCase().includes(searchQuery) ||
      submission.status?.toLowerCase().includes(searchQuery)
    );
    setFilteredSubmissions(filteredData);
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box>
      
        <Box>
          <AdminNavbar/>
        </Box>
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Student Submissions
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          label="Search by Student, Assignment or Status"
          value={filter}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
          sx={{ width: '40%' }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>S.No</TableCell>                    
                    <TableCell>Student Id</TableCell>
                    <TableCell>Assignment Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Submission Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSubmissions.map((submission,i) => (
                    <TableRow key={submission.id}>
                      <TableCell>{i+1}</TableCell>
                      <TableCell>{submission.student_id}</TableCell>
                      <TableCell>{submission.assignmentId}</TableCell>
                      <TableCell>
                        {submission.marksAwarded !== -1 ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Error color="error" />
                        )}
                      </TableCell>
                      <TableCell>{new Date(submission.submittedOn).toLocaleString()}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={()=>handleViewSubmission(submission)}>
                          <Comment />
                        </IconButton>
                        <IconButton color="secondary" target='__blank' href={`http://localhost:2000/file/getFile?name=${submission.filepath}`}>
                          <Download />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default Submissions;
