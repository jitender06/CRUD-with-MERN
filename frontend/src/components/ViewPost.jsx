import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function ViewPost() {
  const [data, setData] = useState()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const postDataJson = await postData.json();
        // console.log(postDataJson)
        setData(postDataJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [data]);

  const deletePost = async (id) => {
    try {
      const newData = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }) 
      fetchData
    } catch (error) {
      console.log("error:", error)
    }
  }
  const updatePost = () => {}

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {
          data?.length == 0 && <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"80vh"} fontSize={"30px"}>Sorry, No Data Found Yet 👽</Box>
        }
        {
          data?.map((item) => {
            return <Grid key={item._id} item md={4} xs={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 30 }} color="black"> {item.title} </Typography>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> {item.email} </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> {item.description.length > 50 ? item.description.slice(0, 400) : item.description }</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant='contained' color="error" onClick={() => deletePost(item._id)}>Delete</Button>
                  <Button size="small" variant='contained' color="primary" onClick={updatePost}>Update</Button>
                </CardActions>
              </Card>
            </Grid>
          })
        }
      </Grid>
    </Container>
  )
}
