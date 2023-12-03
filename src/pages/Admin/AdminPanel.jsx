import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';



const AdminPanel = () => {
  const [restaurantRequests, setRestaurantRequests] = useState([]);
  const [deliveryGuyRequests, setDeliveryGuyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get('http://localhost:5000/api/admin/GetAllRestauRequests');
        setRestaurantRequests(restaurantResponse.data.pendingRequests);

        const deliveryGuyResponse = await axios.get('http://localhost:5000/api/admin/getDeliveryGuysRequests');
        setDeliveryGuyRequests(deliveryGuyResponse.data.pendingRequests);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleApprove = async (id, type) => {
    try {
      await axios.post(`/api/admin/${type}RequestHandler`, { id, status: 'approved' });
      console.log(`${type} request approved`);
      updateLocalState(type, id, 'approved');
    } catch (error) {
      console.error(`Error approving ${type} request:`, error);
    }
  };

  const handleReject = async (id, type) => {
    try {
      await axios.post(`/api/admin/${type}RequestHandler`, { id, status: 'rejected' });
      console.log(`${type} request rejected`);
      updateLocalState(type, id, 'rejected');
    } catch (error) {
      console.error(`Error rejecting ${type} request:`, error);
    }
  };

  const updateLocalState = (type, id, status) => {
    // Update the local state based on the request type
    if (type === 'restaurant') {
      setRestaurantRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status } : request
        )
      );
    } else if (type === 'deliveryGuy') {
      setDeliveryGuyRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status } : request
        )
      );
    }
  };




  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ padding : '3rem'}} >
      <h1>Admin Panel</h1>

      <section>
        <h3>Restaurant Requests</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Restaurant Name</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Contact Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell align="center">{request.businessName}</TableCell>
                  <TableCell align="center">{request.businessAddress}</TableCell>
                  <TableCell align="center">{request.email}</TableCell>
                  <TableCell align="center">
                    <IconButton color="success"  onClick={() => handleApprove(request._id, 'restaurant')} >
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="error"  onClick={() => handleReject(request._id, 'restaurant')} >
                      <ClearIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section>
        <h3>Delivery Guy Requests</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Delivery Guy Name</TableCell>
                <TableCell align="center">Contact Email</TableCell>
                <TableCell align="center">Contact Number</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryGuyRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell align="center">{request.userName}</TableCell>
                  <TableCell align="center">{request.email}</TableCell>
                  <TableCell align="center">{request.num_tel}</TableCell>
                  <TableCell align="center">
                    <IconButton color="success"  onClick={() => handleApprove(request._id, 'deliveryGuy')}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleReject(request._id, 'deliveryGuy')} >
                      <ClearIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>  
        </TableContainer>
      </section>
    </div>
  );
};

export default AdminPanel;
