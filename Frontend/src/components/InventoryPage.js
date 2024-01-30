import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, ListItemText, ListItem, List, Container } from '@mui/material';
import { Link } from "react-router-dom";

function InventoryPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/items`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            })
            .catch((error) => console.error('Fetching error:', error));
    }, []);

   
    const forestThemeStyle = {
        container: {
            marginTop: '40px',
            backgroundColor: '#81C784', 
            padding: '20px',
            borderRadius: '10px'
        },
        card: {
            width: '100%',
            margin: '10px auto',
            backgroundColor: '#A5D6A7', 
        },
        listItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        typography: {
            color: '#2E7D32', 
            fontFamily: 'Comic Sans MS, cursive, sans-serif', 
        },
        link: {
            textDecoration: 'none',
            width: '100%',
        },
        button: {
            width: '100%',
            padding: '10px',
        }
    };

    return (
        <Container maxWidth="lg" style={forestThemeStyle.container}>
            <Typography textAlign="center" variant="h4" style={forestThemeStyle.typography}>
                Magical Inventory Things Will Be Shown Here
            </Typography>
            <List>
                {items.map((item) => (
                    <Link to={`/ItemDisplay/${item.id}`} key={item.id} style={forestThemeStyle.link}>
                        <ListItem style={forestThemeStyle.listItem}>
                            <Button style={forestThemeStyle.button}>
                                <Card elevation={10} style={forestThemeStyle.card}>
                                    <ListItemText
                                        primary={`Title: ${item.ItemName}`}
                                        secondary={`Description: ${item.Description.substring(0, 100)}... - Quantity: ${item.Quantity} - Submitted By: ${item.UserId}`}
                                    />
                                </Card>
                            </Button>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Container>
    );
}

export default InventoryPage;
