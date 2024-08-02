import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import './Join.css';
import './Mix.css';

import { useNavigate } from 'react-router';

const Login = () => {

const[name,setName]=useState('')


  
const navigate=useNavigate();

  const handleRoute=()=>{
    if(name){
      navigate('/chat' , {state:{name}})
    }
  }

const handleUser=(e)=>{
  setName(e.target.value)

}

  return (

<div className="App">


    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        minHeight="100vh"
        className="login-container"
      >
        <img 
          src="https://tse1.mm.bing.net/th?id=OIP.iJ-y2dQK3GC-nXKSSnT2SQHaGV&pid=Api&P=0&h=220" 
          alt="Logo" 
          className="login-logo"
        />
        <Typography variant="h4" gutterBottom className="login-title">
          C CHAT
        </Typography>
        <Box className="underline"></Box>
        <TextField 
onChange={handleUser}
        value={name}
          variant="outlined" 
          margin="normal" 
          required 
          fullWidth 
          label="Enter Your Name" 
          InputLabelProps={{
            style: { color: '#e91e63' },
          }}
          inputProps={{
            style: { color: 'white' },
          }}
          className="input-field"
        />
        <Button 

    onClick={handleRoute}
          variant="contained" 
          color="primary" 
          fullWidth 
          className="login-button"
        >
        Login in 
        </Button>
      </Box>
    </Container>
</div>
  );
};

export default Login;
