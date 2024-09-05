import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ state }) => {

  const { contract } = state;
  const navigate = useNavigate();
  const [name, setName] = useState();
  
  const loginUser = async (e) => {
  
    e.preventDefault();
    try {
      console.log(`name is : ${name}`);

      const logIn = await contract.loginUser(name);
      console.log("Log in ----------- ", logIn);

      toast.success("User logged in successfully");
      navigate("/todo");
    } catch (error) {
      toast.error(error.reason);
    }
  };
  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <h3>Log in Page</h3>
            <br></br>
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
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
