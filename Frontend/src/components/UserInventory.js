/*import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Box, Card, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from "react-router-dom";

function UserInventory({ refresh }) {
    const [items, setItems] = useState([]);

  
    const truncateDescription = (description) => {
        const maxLength = 100;
        return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
    };

    useEffect(() => {
        const getUserItem = () => {
            fetch('http://localhost:8081/cookie', { credentials: 'include' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Cannot verify');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.verified && data.userId) {
                        return fetch(`http://localhost:8081/items/user/${data.userId}`);
                    } else {
                        throw new Error('User not verified.');
                    }
                })
                .then((response) => response.json())
                .then((itemsData) => setItems(itemsData))
                .catch((error) => {
                    console.error(error);
                    alert('Error');
                });
        };
        getUserItem();
    }, [refresh]);

    const DeleteItem = (itemId) => {
        fetch(`http://localhost:8081/items/${itemId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Problem deleting the item');
                }
                setItems(prevItems => prevItems.filter(item => item.id !== itemId));
                alert('Item deleted');
            })
            .catch((error) => {
                console.error('Error deleting', error);
            });
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '40px', backgroundColor: "lightblue" }}>
            <Box mb={5} style={{ marginTop: '40px' }} textAlign="center">
                <Typography variant="h4">My Posted Inventory </Typography>
                <List>
                    {items.map((item) => (
                        <ListItem key={item.id}>
                            <Link to={`/ItemDisplay/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                                <Button>
                                    <Card elevation={10} style={{ width: '1000px', margin: '0 auto' }}>
                                        <ListItemText
                                            style={{ marginLeft: '10px' }}
                                            primary={`Title: ${item.ItemName}`}
                                            secondary={`Description: ${truncateDescription(item.Description)}  Quantity: ${item.Quantity}`}
                                        />
                                    </Card>
                                </Button>
                            </Link>
                            <Button>
                                <DeleteForeverIcon
                                    variant="contained"
                                    style={{ color: 'red' }}
                                    onClick={() => DeleteItem(item.id)}
                                />
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default UserInventory;
*/

import React, { useState, useEffect } from 'react';
import { Button, Container, List, ListItem, ListItemText, Box, Card, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function UserInventory({ refreshIndicator }) {
    const [inventoryItems, setInventoryItems] = useState([]);

    const shortenDescription = (text) => {
        const maxLen = 100;
        return text.length > maxLen ? `${text.substring(0, maxLen)}...` : text;
    };

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                const response = await fetch('http://localhost:8081/cookie', { credentials: 'include' });
                const data = await response.json();
                if (data.verified && data.userId) {
                    const itemsResponse = await fetch(`http://localhost:8081/items/user/${data.userId}`);
                    const items = await itemsResponse.json();
                    setInventoryItems(items);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchUserItems();
    }, [refreshIndicator]);

    const removeItem = (id) => {
        fetch(`http://localhost:8081/items/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setInventoryItems(prev => prev.filter(item => item.id !== id));
                    alert('Item removed');
                } else {
                    throw new Error('Deletion failed');
                }
            })
            .catch(error => console.error('Deletion error:', error));
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '40px', backgroundColor: "#A5D6A7" }}>
            <Box mb={5} textAlign="center" style={{ padding: '20px', backgroundColor: '#81C784', borderRadius: '10px' }}>
                <Typography variant="h4" style={{ fontFamily: 'Comic Sans MS, cursive', color: '#2E7D32' }}>My Inventory</Typography>
                <List>
                    {inventoryItems.map((item) => (
                        <ListItem key={item.id}>
                            <Link to={`/ItemDisplay/${item.id}`} style={{ textDecoration: 'none', width: '100%' }}>
                                <Card elevation={10} style={{ margin: '10px', backgroundColor: '#C5E1A5' }}>
                                    <ListItemText
                                        primary={`Item: ${item.ItemName}`}
                                        secondary={`Details: ${shortenDescription(item.Description)} - Qty: ${item.Quantity}`}
                                    />
                                </Card>
                            </Link>
                            <Button onClick={() => removeItem(item.id)}>
                                <DeleteForeverIcon style={{ color: '#e57373' }} />
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default UserInventory;
