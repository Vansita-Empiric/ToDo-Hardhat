import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = ({ state }) => {
  const { contract } = state;
  const navigate = useNavigate();
  const [name, setName] = useState();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const register = await contract.registerUser(name);      
      console.log("Register ------------", register);
      
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.reason);
    }
  };
  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={registerUser}>
          <h3>Registration Page</h3>
          <br></br>
          <div className="mb-3">
            <label className="form-label">Username :</label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Username"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
