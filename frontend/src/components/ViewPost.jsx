import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
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

  }, []);

  console.log(data); 

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {
          data?.length == 0 && <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"80vh"} fontSize={"30px"}>Sorry, No Data Found Yet 👽</Box>
        }
        {
          data.map((item) => {
            return <Grid key={item._id} item md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 30 }} color="black"> {item.title} </Typography>

                  <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    {item.email}
                  </Typography>

                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.description}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Grid>
          })
        }
      </Grid>
    </Container>
  )
}
