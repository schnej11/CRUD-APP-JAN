import React from "react";
import { Container, Box, Grid, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserRegistration() {
    const navigation = useNavigate();
    const onRegisterClick = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const userInfo = {
            FirstName: formData.get("firstName"),
            LastName: formData.get("lastName"),
            UserName: formData.get("userName"),
            Password: formData.get("password"),
            Manager: true,
        };
        fetch("http://localhost:8081/userbase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        })
        .then((response) => {
            if (!response.ok) throw new Error("Registration Failed");
            alert("Successfully Registered!");
            navigation("/LoginForm");
        })
        .catch((error) => console.error("Error during registration: ", error));
    };

    return (
        <Container component="main" maxWidth="xs" style={{ backgroundColor: '#C8E6C9', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: '#AED581', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                <Typography component="h1" variant="h5" style={{ color: '#33691E', fontFamily: 'Garamond, serif' }}>
                    New User Registration
                </Typography>
                <Box component="form" onSubmit={onRegisterClick} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {/* Fields for registration */}
                        <Grid item xs={12} sm={6}>
                            <TextField name="firstName" required fullWidth id="firstName" label="First Name" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="userName" label="Username" id="userName" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#43A047', color: '#FFFFFF' }}>Sign Up</Button>
                </Box>
            </Box>
        </Container>
    );
}
