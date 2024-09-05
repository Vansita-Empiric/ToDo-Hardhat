import { useState, useEffect } from "react";
import abi from "./artifacts/contracts/ToDoList.sol/ToDoList.json";
import { ethers } from "ethers";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateToDo from "./components/CreateToDo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./App.css";
import ViewToDo from "./components/ViewToDo";
import ModalTodo from "./components/ModalTodo";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setAccount(account?.[0]);
          setState({ provider, signer, contract });
        } else {
          alert("Install Metamask");
        }
      } catch (error) {
        console.error(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register state={state} />} />
          <Route path="/login" element={<Login state={state} />} />
          <Route path="/todo" element={<CreateToDo state={state} account={account} />} />
          <Route path="/modal" element={<ModalTodo />} />
        </Routes>
      </Router>
      <ToastContainer />
      {/* <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
        <p
          className="text-muted lead "
          style={{ marginTop: "10px", marginLeft: "5px" }}
        >
          <small>Connected Account - {account}</small>
        </p>
        <div className="container">
          <Register state={state}></Register>
          <Login state={state}></Login>
          <CreateToDo state={state}></CreateToDo>
        </div>
      </div> */}
    </>
  );
}

export default App;
