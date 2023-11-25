import { 
    createContext, 
    useState, 
    useContext, 
    useEffect 
} from 'react';
import axios from 'axios';

const AuthContext = createContext({}); 
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoadingScreen] = useState(true);
    const checkIfAuthenticated = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/checkAdminToken', {
                headers : {
                    'token': localStorage.getItem('token')
                }
            });
            if(response.status !== 200)
                throw new Error(response)
            setAuthenticated(true);
        } catch (error) {
            console.log(error)
        }   
        setLoadingScreen(false);
    };
    useEffect(() => {
        checkIfAuthenticated();
    }, []);
    const login = async (email, password) => {
        try {
            // Make a POST request to your backend login endpoint
            const response = await axios.post('http://localhost:5000/api/admin/authAdmin', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token)
            // Handle success (you may redirect to a dashboard or show a success message)
            console.log('Login successful', response.data);
            return {
                status: true,
                data: response.data
            }
          } catch (error) {
            // Handle error (you may show an error message to the user)
            console.error('Login failed', error.response.data);
            return {
                status: false,
                data: error.response.data
            }
          }

    }
    const register = async (fname, lname, email, password) => {
        try {
            // Make a POST request to your backend registration endpoint
            const response = await axios.post('http://localhost:5000/api/admin/registerAdmin', {
                firstName: fname,
                lastName: lname,
                email,
                password
            });
      
            // Handle success (you may redirect to a login page or show a success message)
            console.log('Registration successful', response.data);
            return {
                status: true,
                data: response.data
            }
          } catch (error) {
            // Handle error (you may show an error message to the user)
            console.error('Registration failed', error.response.data);
            return {
                status: false,
                data: error.response.data
            }
          }
    }
    return (
        <AuthContext.Provider value={{ 
            isAuthenticated,
            isLoading,
            login,
            register
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);