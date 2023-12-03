import Admin from '../models/AdminModel.js'
import AdminRestau from '../models/AdminRestauModel.js'
import DeliveryGuy from '../models/DeliveryGuyModel.js'

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = "ASBA";


// Route   POST /api/admin/registerAdmin

export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new admin
    const newAdmin = new Admin({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// Route GET /api/admin/checkAdminToken
export const checkAdminToken = async (req, res) => {
  try {
    const { token } = req.headers
    if(!token){
      throw new Error('Provide a token in the headers')
    }
    
    const verified = jwt.verify(token, SECRET_KEY);

    if(verified)
    return res.status(200).json({ message: 'Token valid' });
    else
    return res.status(401).json({ message: 'Invalid token' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}





// Route   POST /api/admin/authAdmin
export const authAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({
        adminId: admin._id,
        email : admin.email
      }
    , SECRET_KEY);

    res.status(200).json({ token, adminId: admin._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




////////////////////// Gestion de restaurant ///////////////////////////



// Route   POST /api/admin/RestauRequestHandler
export const RestauRequestHandler = async (req, res) => {
  const { id, status } = req.body;

  try {
    // Find the restaurant request in the database based on the provided ID
    const restaurantRequest = await AdminRestau.findById(id);

    // Check if the request is found
    if (!restaurantRequest) {
      return res.status(404).json({ message: 'Restaurant request not found' });
    }

    // Update the status of the restaurant request
    AdminRestau.status = status;

    // Save the updated restaurant request
    await AdminRestau.save();

    res.json({ message: `Restaurant request ${status}` });
  } catch (error) {
    console.error('Error handling restaurant request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Route   GET /api/admin/GetAllRestauRequests

export const GetAllRestauRequests = async (req , res) => {
  try {
      const pendingRequests = await AdminRestau.find({ status: 'pending' })

      // Display the pending requests to the admin for approval
      res.status(200).json({ pendingRequests });
    } catch(err){
      res.status(500).json({ error: 'Internal server error' });
    }
}


// Route   POST /api/admin/DeleteRestau

export const DeleteRestau = async (req, res) => {
  try {
    const { restaurantId } = req.body;

    if (!restaurantId) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const deletedRestaurant = await AdminRestau.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};




////////////////////// Gestion de Livreur ///////////////////////////



// Route   POST /api/admin/DeliveryGuyRequestHandler

export const getDeliveryGuysRequests = async (req , res) => {
  try {
    const pendingRequests = await DeliveryGuy.find({ status: 'pending' })

    // Display the pending requests to the admin for approval
    res.status(200).json({ pendingRequests });
  } catch(err){
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Route POST /api/admin/DeliveryGuyRequestHandler
export const DeliveryGuyRequestHandler = async (req, res) => {
  const { id, status } = req.body;

  try {
    // Find the delivery guy request in the database based on the provided ID
    const deliveryGuyRequest = await DeliveryGuy.findById(id);

    // Check if the request is found
    if (!deliveryGuyRequest) {
      return res.status(404).json({ message: 'Delivery guy request not found' });
    }

    // Update the status of the delivery guy request
    DeliveryGuy.status = status;

    // Save the updated delivery guy request
    await DeliveryGuy.save();

    res.json({ message: `Delivery guy request ${status}` });
  } catch (error) {
    console.error('Error handling delivery guy request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Route   POST /api/admin/DeliveryGuyDelete

export const DeliveryGuyDelete = async (req, res) => {
  try {
    const { deliveryGuyId } = req.body;

    if (!deliveryGuyId) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Find and delete the delivery guy account
    const deletedDeliveryGuy = await DeliveryGuy.findByIdAndDelete(deliveryGuyId);

    if (!deletedDeliveryGuy) {
      return res.status(404).json({ error: 'Delivery guy not found' });
    }

    res.status(200).json({ message: 'Delivery guy account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};