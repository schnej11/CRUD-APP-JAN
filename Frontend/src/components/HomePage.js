import React from "react";
import InventoryPage from "./InventoryPage";

function HomePage() {
    const homePageStyle = {
        wrapper: {
            backgroundColor: '#2E7D32', 
            color: '#FFFFFF', 
            padding: '20px',
            minHeight: '100vh', 
            fontFamily: 'Comic Sans MS, cursive, sans-serif', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    return (
        <div style={homePageStyle.wrapper}>
            <h1>Welcome to Our Magical Forest Inventory!</h1>
            <InventoryPage />
        </div>
    );
}

export default HomePage;

