import AdminRestau from '../models/AdminRestauModel.js'

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