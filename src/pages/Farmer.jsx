import React, { useState } from 'react';
import * as MUI from '@mui/material';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Farmer = () => {
    const navigate = useNavigate();

  // Use state to store form values
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    emailAddress: "jondoe@gmail.com",
    gender: "Male",
    dob: "1990-01-01",
    ghCard: "GH123456",
    contactNumber: "+1234567890",
    cooperativeName: "AGRIC COOP-GHANA",
    publicKey: Cookies.get("account"),
    chainId: "ln;skd",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData); // For demonstration purposes
    try {
        console.log(formData);
  
        const response = await fetch(
          "https://ecedilink.onrender.com/farmer-fields",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const data = await response.json();
        // save id to cookie
        Cookies.set('farmerId', data._id, { expires: 7 })
        console.log("Farmer data created successfully:", data);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error sending form data:", error.code);
      }
  };

  return (
    <MUI.Container maxWidth="sm">
      <MUI.Typography variant="h5" gutterBottom>
        Registration Form
      </MUI.Typography>
      <MUI.Box component="form" onSubmit={handleSubmit}>
        <MUI.TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Email Address"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          type="email"
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.FormControl component="fieldset" sx={{ mb: 2 }}>
          <MUI.FormLabel component="legend">Gender</MUI.FormLabel>
          <MUI.RadioGroup
            aria-label="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            row
          >
            <MUI.FormControlLabel
              value="Male"
              control={<MUI.Radio />}
              label="Male"
            />
            <MUI.FormControlLabel
              value="Female"
              control={<MUI.Radio />}
              label="Female"
            />
          </MUI.RadioGroup>
        </MUI.FormControl>
        <MUI.TextField
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Ghana Card Number"
          name="ghCard"
          value={formData.ghCard}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Cooperative Name"
          name="cooperativeName"
          value={formData.cooperativeName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Public Key"
          name="publicKey"
          value={formData.publicKey}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <MUI.TextField
          label="Chain ID"
          name="chainId"
          value={formData.chainId}
          onChange={handleChange}
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

export default Farmer;
