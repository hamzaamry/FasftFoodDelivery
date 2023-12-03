import DeliveryGuy from "../models/DeliveryGuyModel.js";
import OrderRequest from '../models/OrderRequestModel.js';


// sumbit request to the site admin if its approved he can start working as a delivery guy

//POST  /api/deliveryGuy/SubmitRequest

export const SubmitRequest = async (req , res) => {
    try{
        const {userName, email, password, num_tel, age, vehiculeType, city } = req.body

        const newDeliveryGuyRequest = new DeliveryGuy({
            userName, 
            email, 
            password, 
            num_tel, 
            age, 
            vehiculeType, 
            city,
            status: 'pending',
        })

        await newDeliveryGuyRequest.save()

        res.status(200).json({ message: 'Request submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}



////////////////////////////////////////////

//POST  /api/deliveryGuy/AuthDeliveryGuy

export const AuthDeliveryGuy = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the delivery guy by email
    const deliveryGuy = await DeliveryGuy.findOne({ email });

    // Check if the delivery guy exists
    if (!deliveryGuy) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the status is 'approved'
    if (deliveryGuy.status !== 'approved') {
      return res.status(401).json({ error: 'Account not approved. Authentication failed.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = (password === deliveryGuy.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Authentication successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// GET /api/deliveryGuy/GetClientOrders



export const GetClientOrders = async (req, res) => {
  try {
    // Retrieve all orders with the status 'pending'
    const orders = await OrderRequest.find({ status: 'pending' });

    // Send the orders as a response
    res.status(200).json({ orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
};
