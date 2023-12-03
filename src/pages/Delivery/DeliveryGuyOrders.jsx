import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Button,
  IconButton,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const DeliveryGuyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Make a GET request to fetch all client orders data
        const response = await axios.get('http://localhost:5000/api/deliveryGuy/GetClientOrders');

        // Update the state with the fetched orders
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders. Please try again.');
        setLoading(false);
      }
    };

    // Call the fetchOrders function when the component mounts
    fetchOrders();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  const handleOrderDone = (orderId) => {
    // You can add logic to mark the order as "done"
    // For example, send a PATCH request to update the order status
    console.log(`Order ${orderId} marked as done`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Delivery Guy Orders
      </Typography>

      {loading && <CircularProgress style={{ margin: '20px' }} />}

      {error && <Alert severity="error">{error}</Alert>}

      {orders.length > 0 && (
        <List>
          {orders.map((order) => (
            <ListItem key={order._id} sx={{ mb: 2 }}>
              <ListItemText
                primary={
                  <Typography variant="h6">
                    Name: {order.name}, Email: {order.email}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2">
                      Phone Number: {order.phoneNumber}
                    </Typography>
                    {/* Add more order details based on your schema */}
                  </>
                }
              />
              <IconButton
                onClick={() => handleOrderDone(order._id)}
                color="primary"
              >
                <DoneIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default DeliveryGuyOrders;
