import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import Register from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import UserInventory from './components/UserInventory';
import InventoryPage from './components/InventoryPage';
import CreateItem from './components/CreateItem';
import ItemDisplay from './components/ItemDisplay';
import { AuthProvider } from './components/LoginFormRef';

function App() {

  const appStyle = {
    background: 'linear-gradient(to right, #81C784, #A5D6A7)',
    minHeight: '100vh', 
    fontFamily: 'Comic Sans MS, cursive, sans-serif', 
    color: '#2E7D32',
  };

  return (
    <AuthProvider>
      <div style={appStyle}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/UserInventory" element={<UserInventory />} />
          <Route path="/InventoryPage" element={<InventoryPage />} />
          <Route path="/CreateItem" element={<CreateItem />} />
          <Route path="/ItemDisplay/:id" element={<ItemDisplay />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
