import DeliveryGuy from "../models/DeliveryGuyModel.js";
import bcrypt from 'bcrypt'; 



// sumbit request to the site admin if its approved he can start working as a delivery guy

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

export const AuthDeliveryGuy = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the delivery guy by email
    const deliveryGuy = await DeliveryGuy.findOne({ email });

    // Check if the delivery guy exists
    if (!deliveryGuy) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, deliveryGuy.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // You may generate and return a JWT (JSON Web Token) for authentication if credentials are valid
    // Example:
    // const token = generateJWT(deliveryGuy);
    // res.status(200).json({ token });

    // Alternatively, you can simply respond with a success message
    res.status(200).json({ message: 'Authentication successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
