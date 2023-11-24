import jwt from "jsonwebtoken";
const SECRET_KEY = "ASBA";
import Admin from '../models/AdminModel.js'

export const auth = async (req , res , next ) => {
    try{
        const { token } = req.headers
        const verified = jwt.verify(token, SECRET_KEY);
        if(!verified)
            throw new Error();
        const decoded = jwt.decode(verified);
        const adminId = decoded.adminId;
        const adminFind = await Admin.findOne({ _id: adminId })
        if(!adminFind)
            throw new Error();
        req.admin = adminFind;
        next()
    }catch(err) {
        return res.status(500).json({ message: 'invalid token'})
    }
}