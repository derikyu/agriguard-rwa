import { Container, Grid, makeStyles, Box } from "@mui/material";
// import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Paper } from "@mui/material";
import html2canvas from "html2canvas";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  // Define the state to store the fetched data
  const [data, setData] = useState([]);
  const [asset, setAsset] = useState([]);
  const [chartData, setChart] = useState([]);

  // Define the effect to fetch data when the component mounts
  useEffect(() => {
    // Define the URL of your backend endpoint
    const backendURL = "https://ecedilink.onrender.com/farm-fields"; // Replace with your actual backend URL

    // Make a GET request to fetch the data
    axios
      .get(backendURL)
      .then((response) => {
        console.log("Data fetched successfully:", response.data[0].ndvi_chart);
        //setChart(response.data[0].ndvi_chart);
        // Split the data into lines and parse each line
        const chartData = response.data[0].ndvi_chart
          .split("\n")
          .slice(1)
          .map((line) => {
            const [date, ndvi] = line.split(",");
            return { date, ndvi: parseFloat(ndvi) };
          });
        setChart(chartData);
        // Handle the successful response by updating the state with the fetched data
        setData(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = async (assetId) => {
    console.log(assetId);
    setOpen(true);
    event.preventDefault();
    const url = `https://devnet.helius-rpc.com/?api-key=b96c6058-3f8a-414d-a166-722d95fe5c54`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAsset",
        params: {
          id: assetId,
        },
      }),
    });
    const { result } = await response.json();
    console.log("Asset: ", result);
    setAsset(result);
  };
  const handleClose = () => setOpen(false);

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
      <Box sx={{ backgroundColor: "#fff", py: 8 }}>
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
            color="success"
            onClick={goToFarmer}
            size="large"
          >
            Get Started &raquo;
          </Button>
        </Container>
      </Box>
      <Box py={4}>
        <Grid container spacing={3}>
          {data.map((nft) => (
            <Grid item key={nft.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  sx={{ pt: "56.25%" }} // 16:9 aspect ratio
                  image={nft.imageUrl}
                  title="NFT Image"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    NDVI Chart
                  </Typography>
                  <Paper elevation={3} sx={{ padding: 2, height: 300 }}>
                    <LineChart
                      width={300}
                      height={200}
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid stroke="#f5f5f5" />
                      <Line
                        type="monotone"
                        dataKey="ndvi"
                        stroke="#ff7300"
                        yAxisId={0}
                      />
                    </LineChart>
                  </Paper>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleOpen(nft.assetId)}>
                    Click Asset Id: {nft.assetId}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            FARMER NFT ASSET DETAILS JSON
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Paper
              sx={{
                maxHeight: 300,
                overflow: "auto",
                width: "100%",
                padding: 2,
              }}
            >
              <pre>{JSON.stringify(asset, null, 2)}</pre>
            </Paper>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
