import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./Admin/AdminPanel";
import LoginAdmin from "./Admin/LoginAdmin";
import RegisterAdmin from "./Admin/RegisterAdmin";
import { AuthProvider } from "./contexts/Auth.jsx";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/AdminPanel" element={<AdminPanel />} />
            <Route path="/LoginAdmin" element={<LoginAdmin />} />
            <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
