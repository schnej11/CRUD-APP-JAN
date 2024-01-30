import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const ItemDisplay = () => {
    const [item, setItem] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8081/items/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setItem(data);
                setEditItem({ ...data });
            })
            .catch((error) =>
                console.error("Error fetching selected inventory:", error)
            );
    }, [id]);

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setEditItem({ ...item }); 
    };

    const handleSave = () => {
        fetch(`http://localhost:8081/items/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editItem)
        })
        .then((res) => res.json())
        .then(() => {
            setItem({ ...editItem });
            setIsEditMode(false);
        })
        .catch((error) => console.error("Error updating item:", error));
    };

    const handleChange = (e) => {
        setEditItem({ ...editItem, [e.target.name]: e.target.value });
    };

    if (!item) return <div>Loading...</div>;

    return (
        <Card sx={{ m: 3, width: "60%", margin: "auto", marginTop: "50px" }}>
            <CardContent>
                {isEditMode ? (
                    <>
                        <TextField
                            label="Title"
                            name="ItemName"
                            value={editItem.ItemName || ''}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            name="Description"
                            value={editItem.Description || ''}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            multiline
                        />
                        <TextField
                            label="Quantity"
                            name="Quantity"
                            value={editItem.Quantity || ''}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            type="number"
                        />
                        <Button onClick={handleSave} color="primary">Save</Button>
                        <Button onClick={handleCancel} color="secondary">Cancel</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Title: {item.ItemName}
                        </Typography>
                        <Typography variant="body1">
                            Description: {item.Description}
                        </Typography>
                        <Typography variant="body1">Quantity: {item.Quantity}</Typography>
                        <Button onClick={handleEdit} color="primary">Edit</Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ItemDisplay;



