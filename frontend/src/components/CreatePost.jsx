import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePost() {
  const [data, setData] = useState({
    title:"",
    email:"",
    description:""
  })
  const [error, setError] = useState()
  const handleChange = (key, value) => {
    setData({
      ...data,
      [key]: value
    })
  }
  const submitHandle = async() => {
    const response = await fetch("http://localhost:5000/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-Type": "application/json"
      }
    })

    const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }

    if(response.ok){
      console.log(result);
    }
  }
  const notify = () => toast(error);
  return (
    <Container maxWidth="lg">
      <ToastContainer />
      <Typography variant='h4' textAlign={"center"}>Enter the details 👽</Typography>
      <Grid container spacing={2} my={3}>
        <Grid item xs={12}>
          <TextField value={data.title} onChange={(e) => handleChange("title", e.target.value)} fullWidth id="outlined-basic" label="Enter your name ..." variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <TextField value={data.email} onChange={(e) => handleChange("email", e.target.value)} fullWidth id="outlined-basic" label="Enter your email ..." variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <TextField value={data.description} onChange={(e) => handleChange("description", e.target.value)} fullWidth multiline rows={4} id="outlined-basic" label="Enter description ..." variant="outlined" />
        </Grid>

        <Grid textAlign="center" mt={2} item xs={12}>
          <Button variant="contained" onClick={() => {submitHandle(); notify()}}>Submit</Button>
        </Grid>
      </Grid>
    </Container>
  )
}
