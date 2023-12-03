import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = loginNameRef.current.value;
    const password = loginPasswordRef.current.value;

    try {
    
      const response = await axios.post("http://localhost:5000/api/user/authUser", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      navigate("/home");

    } catch (error) {
      console.error("Login failed:", error.message);

    }
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={handleSubmit}>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
