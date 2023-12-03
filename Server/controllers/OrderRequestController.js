import OrderRequest from "../models/OrderRequestModel.js";

// Route POST /api/orderRequest/submitOrder
export const SubmitOrder = async (req, res) => {
  try {
    const {
      name, email, phoneNumber, country, city, postalCode } = req.body;
    
    // Create a new order request instance
    const newOrderRequest = new OrderRequest({
      name,
      email,
      phoneNumber,
      country,
      city,
      postalCode,
      status: 'pending',
    });

    // Save the order request to the database
    await newOrderRequest.save();

    // Respond with a success message
    res.status(200).json({ message: 'Order request submitted successfully' });
  } catch (error) {
    console.error('Error submitting order request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
