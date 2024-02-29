import { Container, Grid, makeStyles, Box } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Home() {
  const nftImages = [
    {
      id: 1,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 1",
    },
    {
      id: 2,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 2",
    },
    {
      id: 3,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 3",
    },
    {
      id: 4,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 1",
    },
    {
      id: 5,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 2",
    },
    {
      id: 6,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 3",
    },
    {
      id: 7,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 1",
    },
    {
      id: 8,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 2",
    },
    {
      id: 9,
      imageUrl: "https://placekitten.com/g/200/200",
      title: "NFT Image 3",
    },
  ];

  const navigate = useNavigate();

  const goToFarmer = (event) => {
    event.preventDefault();
    // check if farmer already exists
    if (Cookies.get("farmerId") === undefined) {
      navigate("/farmer");
    } else {
      navigate("/dashboard");
    }

    // used for testing, clear all cookies
    // Cookies.remove('farmerId')
    // Cookies.remove('account');
    // Cookies.remove('account');
    // Cookies.remove('chain');
    // Cookies.remove('Connected');
  };

  return (
    <div id="contact">
      <Box sx={{ backgroundColor: "#74b5f1", color: "#ffffff", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Register Your Farmland on Solana
          </Typography>
          <Typography variant="body1" paragraph>
            Join the future of farming by registering your farmland as a
            real-world asset on the Solana blockchain. Empower your land with
            the latest technology and gain insights through NDVI calculations
            stored as chart cNFTs.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={goToFarmer}
            size="large"
          >
            Get Started &raquo;
          </Button>
        </Container>
      </Box>
      <p></p>
      <Grid container spacing={3}>
        {nftImages.map((nft) => (
          <Grid item key={nft.id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nft.imageUrl}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nft.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
