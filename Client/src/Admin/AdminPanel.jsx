import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [restaurantRequests, setRestaurantRequests] = useState([]);
  const [deliveryGuyRequests, setDeliveryGuyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch restaurant requests
        const restaurantResponse = await axios.get('http://localhost:5000/api/admin/GetAllRestauRequests');
        console.log('restaurantResponse: ' ,restaurantResponse )
        setRestaurantRequests(restaurantResponse.data.pendingRequests);

        // Fetch delivery guy requests
        const deliveryGuyResponse = await axios.get('http://localhost:5000/api/admin/getDeliveryGuysRequests');
        console.log('deliveryGuyResponse: ' ,deliveryGuyResponse )
        setDeliveryGuyRequests(deliveryGuyResponse.data.pendingRequests);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 
  



  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  
return (
  <div>
    <h1>Admin Panel</h1>

    <section>
      <h3>Restaurant Requests</h3>
      <ul>
        {restaurantRequests.map((request) => (
          <li key={request._id}>
            <p>
              <strong>Restaurant Name:</strong> {request.businessName}
            </p>
            <p>
              <strong>Address:</strong> {request.businessAddress}
            </p>
            <p>
              <strong>Contact Email:</strong> {request.email}
            </p>
            <button /*</li>onClick={() => handleApprove(request._id, 'restaurant')}*/>Approve</button>
            <button /* onClick={() => handleReject(request._id, 'restaurant')}*/>Reject</button>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h3>Delivery Guy Requests</h3>
      <ul>
        {deliveryGuyRequests.map((request) => (
          <li key={request._id}>
            <p>
              <strong>Delivery Guy Name:</strong> {request.userName}
            </p>
            <p>
              <strong>Contact Email:</strong> {request.email}
            </p>
            <p>
              <strong>Contact Number:</strong> {request.num_tel}
            </p>
            <button /*</li>onClick={() => handleApprove(request._id, 'restaurant')}*/>Approve</button>
              <button /* onClick={() => handleReject(request._id, 'restaurant')}*/>Reject</button>
          </li>
        ))}
      </ul>
    </section>
  </div>
);
};

export default AdminPanel;
