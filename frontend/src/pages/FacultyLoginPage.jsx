import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Paper, CssBaseline } from '@mui/material';
import { useForm } from 'react-hook-form';
import {reactLocalStorage as ls} from 'reactjs-localstorage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FacultyLoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const [userData,setUserData] = useState(null);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data);
    try{

    await axios.post(`http://localhost:2001/admin/login`,data).then((res)=>{
      console.log(res.data.username);
      ls.set("username",res.data.username);
    ls.set("role",res.data.role);
    ls.set("id",res.data.id);
      navigate("/admin");
    }).catch((e)=>console.log(e));
    
    }
    catch(e)
    {
      console.log(e);
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
              Admin Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('uname', {
                  required: 'Username is required',
                  minLength: {
                    value:5,
                    message: 'Enter a valid username min length 5 characthers'
                  }
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
                    value: 5,
                    message: 'Password must be at least 5 characters long'
                  }
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

            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Grid item>
                <Button color="primary" size="small" sx={{ fontSize: '0.875rem' }}>
                  Forgot Password?
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FacultyLoginPage;
