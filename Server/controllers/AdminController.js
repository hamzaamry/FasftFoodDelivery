import Admin from '../models/AdminModel.js'
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

