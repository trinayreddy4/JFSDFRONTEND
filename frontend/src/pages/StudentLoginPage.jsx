import React from 'react';
import { Container, Typography, TextField, Button, Box, Paper, CssBaseline } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {reactLocalStorage as ls} from 'reactjs-localstorage';
import { useNavigate } from 'react-router-dom';

const StudentLoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res =await axios.post(`http://localhost:2003/student/login`,data);
        console.log(res.data.username);
       
      if (res.status === 200) {
        // Save token to local storage
        ls.set("username",res.data.username);
        ls.set("role",res.data.role);
        ls.set("id",res.data.id);

        // Redirect to the student dashboard
        navigate('/student/');
      }
    } catch (error) {
      // Handle error messages
      if (error.response && error.response.status === 401) {
        alert("Invalid username or password");
      } else {
        console.error("Error during login: ", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'url()',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              Student Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('username', {
                  required: 'Username is required',
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default StudentLoginPage;
