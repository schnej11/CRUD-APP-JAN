import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "./LoginFormRef"; 

const Navigation = () => {
    const navigate = useNavigate();
    const { LoggedIn, setLoggedIn } = useAuth();

    const handleLogout = () => {
        document.cookie = "userId=; expires=Sat, 26 Jan 2024 00:00:00 UTC; path=/;";
        alert("You Are Logged Out");
        navigate("/Login");
        setLoggedIn(false);
    };

    const navBarStyle = {
        backgroundColor: '#4caf50',
        color: '#000000', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    };

    const navToolbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const navTitleStyle = {
        flexGrow: 1,
        fontFamily: 'Fantasy, cursive',
        fontSize: '1.8rem',
        color: '#fdd835' 
    };

    const navButtonStyle = {
        backgroundColor: '#ff7043', 
        color: '#ffffff', 
        marginRight: '5px',
        padding: '10px 20px',
        borderRadius: '4px',
        fontFamily: 'Comic Sans MS, cursive',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s'
    };

    const navIconStyle = {
        marginRight: '10px',
        color: '#ffffff' 
    };

    return (
        <AppBar position="static" style={navBarStyle}>
            <Toolbar style={navToolbarStyle}>
                <Typography variant="h6" style={navTitleStyle}>
                    The Inventory Store of Things You Want to Inventory 
                </Typography>

                <Button color="inherit" component={RouterLink} to="/" style={navButtonStyle}>
                    <HomeIcon style={navIconStyle} />
                    Inventory
                </Button>

                {LoggedIn && (
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/Dashboard"
                        style={navButtonStyle}
                    >
                        <PersonIcon style={navIconStyle} />
                        Dashboard
                    </Button>
                )}
                {!LoggedIn && (
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/Login"
                        style={navButtonStyle}
                    >
                        <PersonIcon style={navIconStyle} />
                        Login
                    </Button>
                )}

                {!LoggedIn && (
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/Register"
                        style={navButtonStyle}
                    >
                        <ListAltIcon style={navIconStyle} />
                        Register
                    </Button>
                )}

                {LoggedIn && (
                    <Button color="inherit" onClick={handleLogout} style={navButtonStyle}>
                        <LockOpenIcon style={navIconStyle} />
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;

