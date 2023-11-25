import mongoose from "mongoose";

const DeliveryGuySchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
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
  age: {
    type: Number,
    required: true,
  },
  vehiculeType: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending'
  }
});

const DeliveryGuy = mongoose.model("DeliveryGuy", DeliveryGuySchema);

export default DeliveryGuy
