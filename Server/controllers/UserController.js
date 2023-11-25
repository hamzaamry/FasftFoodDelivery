import User from '../models/UserModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "ASBA";
//route   POST /api/User/authUser

export const authUser = async (req , res) => {
    try {
        const { email, password } = req.body;
    
        // Check if the User exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Generate a JWT token for authentication
        const token = jwt.sign({
            userId: User._id,
            email : User.email
          }
        , SECRET_KEY);
    
        res.status(200).json({ token, userId: user._id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}


//route   POST /api/User/registerUser

export const registerUser = async (req , res) => {
    try {
        const { username, email, password, num_tel } = req.body;
    
        // Check if the username already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists with this email' });
        }
    
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 12);
    
        // Create a new User
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            num_tel,
        });
    
        // Save the User to the database
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

