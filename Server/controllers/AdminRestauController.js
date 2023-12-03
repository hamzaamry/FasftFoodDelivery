import AdminRestau from '../models/AdminRestauModel.js'
import bcrypt from 'bcrypt';


// sumbit request to the site admin if its approved he can start uploading his foods

export const SubmitRequest = async (req , res) => {
    try {
        const { businessName, businessAddress, firstName, lastName, email, password, num_tel  } = req.body;
        
        const newRestauRequest = new AdminRestau({
            businessName,
            businessAddress,
            firstName,
            lastName,
            email,
            password,
            num_tel
        })
        await newRestauRequest.save();
        res.status(200).json({ message: 'Request submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


//POST /api/restau/RestauAuth

export const RestauAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin with the provided email
    const admin = await AdminRestau.findOne({ email });

    // Check if the admin exists
    if (!admin) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Check if the status is "approved"
    if (admin.status !== 'approved') {
      return res.status(401).json({ message: 'Authentication failed. Account not approved.' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
    }

    // If all checks pass, authentication is successful
    res.status(200).json({ message: 'Authentication successful' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const AddFood = async (req , res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export const DeleteFood = async (req , res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}


export const UpdateFood = async (req , res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}