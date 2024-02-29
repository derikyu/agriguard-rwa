import React, { useState } from "react";
import axios from "axios";
import * as MUI from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Farm = () => {
  const [formData, setFormData] = useState({
    farmName: "Farm 1",
    farmLocation1: "-0.210134, 5.6325847",
    farmLocation2: "-0.209353, 5.617903",
    farmLocation3: "-0.193386, 5.624380",
    farmLocation4: "-0.205448, 5.640788",
    ownershipType: "family-owned",
    ndvi_chart: "",
    cropTree: "cocoa",
    irrigationSystem: "drip irrigation",
    insurer: "Ghana Agricultural Insurance Pool (GAIP)",
    farmerFields: Cookies.get("farmerId"),
  });

  // Format farmLocation array
  const farmLocation = [
    {
      type: "Point",
      coordinates: formData.farmLocation1.split(",").map(parseFloat),
    },
    {
      type: "Point",
      coordinates: formData.farmLocation2.split(",").map(parseFloat),
    },
    {
      type: "Point",
      coordinates: formData.farmLocation3.split(",").map(parseFloat),
    },
    {
      type: "Point",
      coordinates: formData.farmLocation4.split(",").map(parseFloat),
    },
  ];

  const requestData = {
    title: "Example Location",
    polygon: {
      type: "Polygon",
      coordinates: [
        [
          {
            lng: farmLocation[0].coordinates[0],
            lat: farmLocation[0].coordinates[1],
          },
          {
            lng: farmLocation[1].coordinates[0],
            lat: farmLocation[1].coordinates[1],
          },
          {
            lng: farmLocation[2].coordinates[0],
            lat: farmLocation[2].coordinates[1],
          },
          {
            lng: farmLocation[3].coordinates[0],
            lat: farmLocation[3].coordinates[1],
          },
        ],
      ],
    },
  };

  // Extracting coordinates
  const coordinates = requestData.polygon.coordinates[0].map((coord) => [
    coord.lng,
    coord.lat,
  ]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const chartContainer = document.getElementById("chart-container");
    html2canvas(chartContainer).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      console.log("imageData", imageData);
      // setImageData(imageData);
    });

    try {
      // Call the getMerkleTree function to obtain the treeKeypair and treeAuthority
      const { treeKeypair, treeAuthority } = await getMerkleTree();
      // Now you can use treeKeypair and treeAuthority as needed
      console.log("Tree Keypair:", treeKeypair.publicKey.toBase58());
      console.log("Tree Authority:", treeAuthority.toBase58());
      // Other operations with treeKeypair and treeAuthority
    } catch (error) {
      console.error("Error obtaining the merkle tree:", error);
    }
    // try {
    // console.log("farmLocation ", requestData);
    // //  // Updated formData object
    // const updatedFormData = {
    //   farmName: "Farm 1",
    //   farmLocation: farmLocation,
    //   ownershipType: "family-owned",
    //   ndvi_chart: "",
    //   cropTree: "cocoa",
    //   irrigationSystem: "drip irrigation",
    //   insurer: "Ghana Agricultural Insurance Pool (GAIP)",
    //   farmerFields: Cookies.get("farmerId"),
    // };
    // // console.log(updatedFormData);
    // const response = await fetch("http://localhost:3000/farm-fields/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedFormData),
    // });
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.statusText}`);
    // }
    // const data = await response.json();
    // // calculate ndvi
    // // Extracting coordinates
    // // Making the request with only coordinates
    // axios
    //   .post("http://127.0.0.1:8000/ndvi/", requestData)
    //   .then((response) => {
    //     console.log("Request successful:", response.data.cvs_data);
    //     // update the users farm profile with new ndvi chat data
    //     // update by farm id data._id
    //     const newData = {
    //       ndvi_chart: response.data.cvs_data,
    //     };
    //     axios
    //       .put(`http://localhost:3000/farm-fields/${data._id}`, newData)
    //       .then((response) => {
    //         console.log("Resource updated successfully:", response.data);
    //         // create nft from chart
    //         // pass chart data to the nft creation method
    //         // pass
    //         // Navigate to the dashboard after successful update
    //         navigate("/dashboard");
    //       })
    //       .catch((error) => {
    //         console.error("Error updating resource:", error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    // save id to cookie
    // console.log("Farmer data created successfully:", data);
    // } catch (error) {
    //   console.error("Error sending form data:", error.code);
    // }
  };

  return (
    <MUI.Container maxWidth="sm">
      <MUI.Typography variant="h5" gutterBottom>
        Farm Fields Registration
      </MUI.Typography>
      <MUI.Box component="form" onSubmit={handleSubmit}>
        <MUI.TextField
          label="Farm Name"
          name="farmName"
          value={formData.farmName}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Farm Location 1"
          name="farmLocation1"
          value={formData.farmLocation1}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Farm Location 2"
          name="farmLocation2"
          value={formData.farmLocation2}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Farm Location 3"
          name="farmLocation3"
          value={formData.farmLocation3}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Farm Location 4"
          name="farmLocation4"
          value={formData.farmLocation4}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Ownership Type"
          name="ownershipType"
          value={formData.ownershipType}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="NDVI Chart"
          name="ndvi_chart"
          value={formData.ndvi_chart}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Crop/Tree"
          name="cropTree"
          value={formData.cropTree}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Irrigation System"
          name="irrigationSystem"
          value={formData.irrigationSystem}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Insurer"
          name="insurer"
          value={formData.insurer}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Farmer Fields"
          name="farmerFields"
          value={formData.farmerFields}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.Button type="submit" variant="contained" color="success">
          Submit
        </MUI.Button>
      </MUI.Box>
    </MUI.Container>
  );
};

export default Farm;
