import mongoose from "mongoose";

const adminRestauSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
  },
  businessAddress: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  num_tel: {
    type: String,
    required: true,
  },
});

const AdminRestau = mongoose.model("AdminRestau", adminRestauSchema);

module.exports = AdminRestau
export default AdminRestau