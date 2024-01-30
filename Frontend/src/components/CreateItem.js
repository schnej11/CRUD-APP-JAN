import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Grid, Container } from '@mui/material';

const CreateItem = ({ onNewItem }) => {
    const [description, setDescription] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/cookie', { credentials: 'include' })
            .then(response => response.json())
            .then(userData => {
                if (userData.verified) {
                    setUserId(userData.userId);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handlePostItem = () => {
        if (!userId) {
            alert('Please log in before posting');
            return;
        }

        const data = {
            UserId: userId,
            ItemName: itemName,
            Description: description,
            Quantity: quantity,
        };
        fetch('http://localhost:8081/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error with network response');
                }
                alert('Item added successfully!');
                onNewItem();
            })
            .catch(error => {
                console.error('POST error', error);
            });
    };

    const forestThemeStyle = {
        card: {
            backgroundColor: '#A5D6A7',
            padding: '20px',
            margin: '20px auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        },
        button: {
            backgroundColor: '#388E3C',
            color: '#FFFFFF',
            marginTop: '20px',
        },
        textField: {
            marginBottom: '15px', // Added space between text fields
        },
        container: {
            marginTop: '40px',
            backgroundColor: '#E8F5E9',
            padding: '20px',
            borderRadius: '10px'
        }
    };

    return (
        <Container maxWidth="lg" style={forestThemeStyle.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card style={forestThemeStyle.card}>
                        <CardContent>
                            <TextField 
                                fullWidth 
                                id="itemName" 
                                label="Name Of Item" 
                                variant="outlined" 
                                value={itemName} 
                                onChange={(e) => setItemName(e.target.value)}
                                style={forestThemeStyle.textField}
                            />
                            <TextField 
                                fullWidth 
                                id="description" 
                                label="Description" 
                                variant="outlined" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                style={forestThemeStyle.textField}
                            />
                            <TextField 
                                fullWidth 
                                id="quantity" 
                                label="Quantity" 
                                variant="outlined" 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)}
                                style={forestThemeStyle.textField}
                            />
                            <Button 
                                fullWidth 
                                onClick={handlePostItem} 
                                variant="contained" 
                                style={forestThemeStyle.button}>
                                Add New Item
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateItem;
