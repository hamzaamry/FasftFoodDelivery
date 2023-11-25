import DeliveryGuy from "../models/DeliveryGuyModel.js";

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
            city
        })

        await newDeliveryGuyRequest.save()

        res.status(200).json({ message: 'Request submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}