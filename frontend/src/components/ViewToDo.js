import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ViewToDo = ({ state, todos }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editData, setEditData] = useState({});
  const [newContent, setNewContent] = useState();

  const { contract } = state;

  const editTodo = async () => {
    try {
      const editTodoList = await contract.updateTodoById(
        editData.todoId,
        newContent
      );
      await editTodoList.wait();
      console.log("editTodo ------------- ", editTodoList);

      console.log("new content: ", newContent);

      setEditData({});
      toast.success("Data updated");
      handleClose();
      window.location.reload();
    } catch (error) {
      toast.error(error.reason);
      setEditData({});
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const deleteTodoList = await contract.deleteTodoById(todoId);
      console.log("deleteTodo ------------- ", deleteTodoList);
      toast.success("ToDo Deleted");
    } catch (error) {
      console.log("error--------------", error);

      toast.error(error.reason);
    }
  };

  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <p style={{ textAlign: "center", marginTop: "20px" }}></p>
        {todos?.map((todo) => {
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
                        backgroundColor: "#c3d5fa",
                        border: "1px solid white",
                        borderCollapse: "collapse",
                        padding: "7px",
                        width: "300px",
                      }}
                    >
                      {todo.todoId}
                    </td>

                    <td
                      style={{
                        backgroundColor: "#c3d5fa",
                        border: "1px solid white",
                        borderCollapse: "collapse",
                        padding: "7px",
                        width: "700px",
                      }}
                    >
                      {todo.description}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#cbf7d7",
                        border: "1px solid white",
                        borderCollapse: "collapse",
                        padding: "7px",
                        width: "40px",
                      }}
                    >
                      <FaEdit
                        onClick={() => {
                          handleShow();
                          setEditData(todo);
                        }}
                      />
                    </td>
                    <td
                      style={{
                        backgroundColor: "#f7cbcb",
                        border: "1px solid white",
                        borderCollapse: "collapse",
                        padding: "7px",
                        width: "40px",
                      }}
                    >
                      <ImBin
                        onClick={() => {
                          deleteTodo(todo.todoId);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit ToDo</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editTodo}>
          <Modal.Body>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>ToDo Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(todo) => setNewContent(todo.target.value)}
                defaultValue={editData.description}
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={editTodo}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ViewToDo;
