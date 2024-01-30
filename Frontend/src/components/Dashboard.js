import React, { useState, useCallback } from "react";
import UserInventory from "./UserInventory";
import CreateItem from "./CreateItem";
import { Card, Grid, Container } from '@mui/material';


const Dashboard = () => {
    const [refresh, setRefresh] = useState(false);

   
    const handleNewItem = useCallback(() => {
        setRefresh(prevRefresh => !prevRefresh);
    }, []);

    
    const dashboardStyle = {
        container: {
            backgroundColor: '#E8F5E9',
            marginTop: '40px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        },
        card: {
            backgroundColor: '#A5D6A7',
            margin: '20px',
            padding: '20px',
            color: '#2E7D32'
        },
        grid: {
            margin: '0 auto'
        }
    };

    return (
        <Container maxWidth="lg" style={dashboardStyle.container}>
            <Grid container spacing={3} style={dashboardStyle.grid}>
                <Grid item xs={12}>
                    <Card style={dashboardStyle.card}>
                        <CreateItem onNewItem={handleNewItem} />
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card style={dashboardStyle.card}>
                        <UserInventory refresh={refresh} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
