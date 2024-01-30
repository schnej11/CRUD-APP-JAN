import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./LoginFormRef";

function LoginForm() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [credentials, setCredentials] = useState({ userName: '', password: '' });

    const updateField = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const loginUser = (e) => {
        e.preventDefault();
        fetch("http://localhost:8081/userbase/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ UserName: credentials.userName, Password: credentials.password }),
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Successfully verified") {
                document.cookie = `userId=${data.userId}; path=/`;
                auth.setLoggedIn(true);
                navigate("/Dashboard");
            } else {
                alert("Login failed. Check your username and password.");
            }
        })
        .catch(error => {
            console.error("Login error: ", error);
            alert("An error occurred during login.");
        });
    };

    return (
        <Container component="main" maxWidth="xs" style={{ padding: '20px', marginTop: '40px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Login</Typography>
                <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="userName"
                        value={credentials.userName}
                        onChange={updateField}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={updateField}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: 'green' }} // Custom green color
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginForm;
