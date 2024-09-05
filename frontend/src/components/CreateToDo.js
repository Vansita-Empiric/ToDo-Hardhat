import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ViewToDo from "./ViewToDo";

const CreateToDo = ({ state, account }) => {
    // console.log("account------------", account);

  const { contract } = state;
  const [description, setDescription] = useState();
  const [todoList, setTodoList] = useState();
  const navigate = useNavigate();

  const getTodoList = async () => {
    try {
      const viewToDoList = await contract.getTodo(account);
    //   await viewToDoList.wait();
    //   console.log("viewToDo ------------ ", viewToDoList);
    // window.location.reload();
      setTodoList(viewToDoList);
    } catch (error) {
      console.log(error);

      toast.error(error.reason);
    }
  };

  useEffect(() => {
    contract && getTodoList();
  }, [account, contract]);

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const addToDo = await contract.createTodo(description);
      console.log("Create todo ----------- ", addToDo);

      toast.success("To Do created");
      getTodoList();
      window.location.reload();
    } catch (error) {
      toast.error(error.reason);
    }
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const logOut = await contract.logoutUser();
      console.log("Log out ----------- ", logOut);

      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.reason);
    }
  };
//   console.log("todolist----------", todoList);

  return (
    <>
      <small>Connected Account - {account}</small>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <button type="submit" className="btn btn-primary" onClick={logoutUser}>
          Log out
        </button>

        <div
          className="container-md"
          style={{ width: "50%", marginTop: "25px" }}
        >
          <form onSubmit={createTodo}>
            <h3>create ToDo Page</h3>
            <br></br>
            <div className="mb-3">
              <label className="form-label">Description :</label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Enter Description"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!state.contract}
            >
              Add ToDo
            </button>
          </form>
        </div>
      </div>
      <ViewToDo state={state} account={account} todos={todoList} />

      {/* -------------------------------view todo code----------------------------------- */}

      {/* <p style={{ textAlign: "center", marginTop: "20px" }}></p>
      {todoList?.map((todo) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",
                    }}
                  >
                    {todo.todoId}
                  </td>

                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                    }}
                  >
                    {todo.description}
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        );
      })} */}
    </>
  );
};

export default CreateToDo;
